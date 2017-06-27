/**
 * Created by tomas on 22.04.2017.
 */

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const user = require("./Models/user");

module.exports = function () {

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        user.findById(id, function (err, user) {
            done(err, user);
        });
    });
};

passport.use("login", new LocalStrategy(function (username, password, done) {

        user.findOne({username: username}, function (err, user) {
            if(err){ return done(err); }
            if(!user){
                return done(null, false, {message: "User doesn't exist"});
            }

            user.checkPassword(password, function (err, isMatch) {
                if(err) { return done(err); }
                if(isMatch){
                    return done(null, user);
                } else{
                    return done(null, false, {message: "Invalid password"});
                }
            });
        });
    })
);

