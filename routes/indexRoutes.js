// express related
const express = require("express");
const router = express.Router();

// bcrypt related
const bcryptjs = require("bcryptjs");

// dotenv related
const dotenv = require("dotenv");
dotenv.config({ path: "./.env", encoding: "utf-8" });

// passport related
const passport = require("passport");
const {
  authenticate,
  checkUserLoggedIn,
} = require("../config/authenticate.js");

// controllers
const {
  index_get,
  register_post,
  login_post,
  logout_get,
  profile_get,
  profile_post,
  profile_delete,
} = require("../controllers/indexControllers");

const User = require("../models/User.js");
const { json } = require("express");

// local authn routes
router.post("/register", register_post);

router.post("/login", login_post);

router.get("/logout", logout_get);

// oauth routes
router.get("/login/auth/google/logout", (req, res, next) => {
  req.logout();
  res.json({
    success: true,
    data: {},
    error: null,
  });
});

router.get(
  "/login/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  (req, res, next) => {
    next();
  }
);

router.get(
  "/login/auth/google/callback",
  passport.authenticate("google"),
  (req, res, next) => {
    res.redirect("/dashboard.html");
  }
);

router.get("/profile", authenticate, checkUserLoggedIn, profile_get);

router.post("/profile", authenticate, checkUserLoggedIn, profile_post);

router.delete("/profile", authenticate, checkUserLoggedIn, profile_delete);


module.exports = router;
