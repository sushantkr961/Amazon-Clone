const jwt = require("jsonwebtoken");

const verifyIsLoggedIn = (req, res, next) => {
  next();
  return; // to do: remove later
  try {
    const token = req.cookies.access_token;
    // console.log(token);
    if (!token) {
      return res
        .status(403)
        .send("Token is required for authenticatin.Please Login");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).send("Unauthorized.Invalid Token");
    }
  } catch (error) {
    next(error);
  }
};

const verifyisAdmin = (req, res, next) => {
  next();
  return; // to do: remove later
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).send("Unauthorized. Admin required.");
  }
};

module.exports = { verifyIsLoggedIn, verifyisAdmin };
