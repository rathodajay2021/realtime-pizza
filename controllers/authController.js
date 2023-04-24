const UserModal = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

const login = (req, res) => {
  res.render("./authentication/login");
};

const postLogin = async (req, res, next) => {
  const { password, email } = req.body;
  if (!password || !email) {
    //if input field are empty
    req.flash("error", "All fields are required");
    return res.redirect("/login");
  }
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      req.flash("error", info.message);
      return next(err);
    }
    if (!user) {
      req.flash("error", info.message);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        req.flash("error", info.message);
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

const register = (req, res) => {
  res.render("./authentication/register");
};

const postRegister = async (req, res) => {
  //validation of register req
  const { name, password, email } = req.body;
  // console.log(name,password,email)
  if (!name || !password || !email) {
    //if input field are empty
    req.flash("error", "All fields are required");
    req.flash("name", name);
    req.flash("email", email);
    return res.redirect("/register");
  }
  // check if email exist
  UserModal.exists({ email: email }, (err, result) => {
    if (result) {
      req.flash("error", "This email is already register");
      req.flash("name", name);
      req.flash("email", email);
      return res.redirect("/register");
    }
  });
  //Hash password
  const hashedPassword = await bcrypt.hash(password, 5);
  //create a user
  const userRegisterDetails = new UserModal({
    name: name,
    email: email,
    password: hashedPassword,
  });
  userRegisterDetails
    .save()
    .then((result) => {
      req.flash("success", "User created successfully");
      return res.redirect("/login");
    })
    .catch((err) => console.log(err));
};

const logout = (req, res) => {
  req.logout();
  req.flash("success", "you succefully logout");
  return res.redirect("/login");
};

module.exports = {
  login,
  postLogin,
  register,
  postRegister,
  logout,
};
