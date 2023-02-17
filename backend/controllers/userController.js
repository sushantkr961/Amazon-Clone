const Product = require("../models/productModel");
const Review = require("../models/reviewModel");
const User = require("../models/userModel");
const generateAuthToken = require("../utilities/generateAuthToken");
const { hashPassword, comparePasswords } = require("../utilities/hashPassword");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, lastName, email, password } = req.body;
    // if (!name || !lastName || !email || !password) {  // OR
    if (!(name && lastName && email && password)) {
      return res.status(400).send("All inputs are required");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("User Already Exists.");
    } else {
      const hashedPassword = hashPassword(password);
      const user = await User.create({
        name,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
      });
      res
        .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.name,
            user.lastName,
            user.email,
            user.isAdmin
          ),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", // other website can't access this cookie
          }
        )
        .status(201)
        .json({
          success: "User created",
          userCreated: {
            // user, // no need to show password in response so
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
          },
        });
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password, doNotLogout } = req.body;
    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }
    const user = await User.findOne({ email }).orFail();
    if (user && comparePasswords(password, user.password)) {
      let cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };

      if (doNotLogout) {
        cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 }; // 7 days
      }
      return res
        .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.name,
            user.lastName,
            user.email,
            user.isAdmin
          ),
          cookieParams
        )
        .json({
          success: "Login successfully",
          userLoggedIn: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            doNotLogout,
          },
        });
    } else {
      return res.status(401).send("wrong credentials");
    }
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber;
    user.address = req.body.address;
    user.country = req.body.country;
    user.pinCode = req.body.pinCode;
    user.city = req.body.city;
    user.state = req.body.state;

    if (req.body.password !== user.password) {
      user.password = hashPassword(req.body.password);
    }

    await user.save();

    res.json({
      success: "user updated successfully",
      userUpdated: {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    return res.send(user);
  } catch (error) {
    next(error);
  }
};

const writeReview = async (req, res, next) => {
  try {
    const session = await Review.startSession();

    // get comment, rating from request.body
    const { comment, rating } = req.body;
    //validate request
    if (!(comment && rating)) {
      return res.status(400).send("All inputs are required");
    }

    // create review id manually because it is needed also for saving in Product collection
    const ObjectId = require("mongodb").ObjectId;
    let reviewId = new ObjectId();

    session.startTransaction();

    await Review.create(
      [
        {
          _id: reviewId,
          comment: comment,
          rating: Number(rating),
          user: {
            _id: req.user._id,
            name: req.user.name + " " + req.user.lastName,
          },
        },
      ],
      { session: session }
    );

    const product = await Product.findById(req.params.productId)
      .populate("reviews")
      .session(session);

    // one user is allowed to write one review for one product
    const alreadyReviewed = product.reviews.find(
      (r) => r.user._id.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).send("product already reviewed");
    }

    // res.send(product);
    let prc = [...product.reviews];
    prc.push({ rating: rating });
    product.reviews.push(reviewId);

    // if reviews is not given
    if (product.reviews.length === 1) {
      product.rating = Number(rating);
      product.reviewsNumber = 1;
    } else {
      // review is already given then average review
      product.reviewsNumber = product.reviews.length;
      product.rating =
        prc
          .map((item) => Number(item.rating))
          .reduce((sum, item) => sum + item, 0) / product.reviews.length;
    }

    await product.save();

    await session.commitTransaction();
    session.endSession();
    res.send("review created");
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }
};

// get single user for admin
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select("name lastName email isAdmin")
      .orFail();
    return res.send(user);
  } catch (error) {
    next(error);
  }
};

// update the user for admin
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();

    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    await user.save();
    res.send(user);
  } catch (error) {
    next(error);
  }
};

// delete the user for admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    await user.remove();
    res.send("user removed successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  writeReview,
  getUser,
  updateUser,
  deleteUser,
};
