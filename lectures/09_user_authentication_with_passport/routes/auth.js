var express = require("express");
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require("../models/user");

var authMiddleware = require("../middlewares/auth");


passport.use(new LocalStrategy(function(username, password, next) {
  console.log("이건 대체 언제 실행되는건강/?");
  User.authenticate(username, password, function(error, user) {
    if (error) return next(error);
    return next(null, user);
  });
}));


passport.serializeUser(function(user, done) {
  done(null, user._id);
});


passport.deserializeUser(function(id, done) {
  User.findOne({_id: id}, function(error, user) {
    done(error, user);
  });
});


router.route("/login/")
  .all(authMiddleware.logoutRequired)
  .get(function(request, response) {
    return response.render("auth/login");
  })
  .post(
    passport.authenticate("local", {failureRedirect: "/login/"}),
    function(request, response) {
      return response.redirect("/");
    }
  );


router.route("/signup/")
  .all(authMiddleware.logoutRequired)
  .get(function(request, response) {
    return response.render("auth/signup");
  })
  .post(function(request, response, next) {
    // FIXME: should validate user

    var user = new User({
      username: request.body.username,
      password: request.body.password,
      email: request.body.email,
      phonenumber: request.body.phonenumber
    });

    user.save(function(error, user) {
      if (error) return next(error);
      return response.redirect("/");
    });
  });


router.get("/logout/", function(request, response) {
  return response.redirect("/");
});


router.get("/profile/", authMiddleware.loginRequired, function(request, response) {
  return response.render("auth/profile");
});


module.exports = router;