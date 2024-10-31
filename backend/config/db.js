const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect("mongodb+srv://aliozturktr61:ahzs1357@cluster0.egtld.mongodb.net/")
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
};

module.exports = db;
 