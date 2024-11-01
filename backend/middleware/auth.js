const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const authMid = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(500).json({ message: "Erişim için lütfen login olunuz" });
  }

  const decodedData = jwt.verify(token, "SECRETTOKEN");

  if (!decodedData) {
    return res
      .status(500)
      .json({ message: "Erişim tokeniniz gecersizdir!!!!" });
  }

  req.user = await User.findById(decodedData.id);

  next();
};

const roleChecked = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(500)
        .json({ message: "Giriş için izniniz bulunmamaktadır !!!!" });
    }
    next();
  };
};

module.exports = { authMid, roleChecked };
