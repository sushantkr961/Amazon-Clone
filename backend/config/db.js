const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    // userNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log(`MongoDB connection SUCCESS`);
  })
  .catch((e) => console.log(e, `MongoDB connection FAILED`));
