/**
 * Created by tomas on 14.05.2017.
 */
var express = require("express");
var passport = require("passport");
var router = express.Router();

router.use(function (req, res, next) {
    if(req.isAuthenticated()){
        next();
    }else {

        res.redirect("/401");
        return;
    }
});

router.get("/myProfile", function (req, res) {
    app.pokemons.find({id_user : req.user._id}, function (err, pokes) {
        if(err){
            console.log(err);
        }else{
            res.render("about_page", {"pokemons": pokes});
        }
    });
});

router.get("/change_passwd", function (req, res) {
    res.render("change_passwd");
});

router.patch("/change_passwd", function (req, res, next) {
    console.log(req.user);
    req.user.checkPassword(req.body.old, function (err, isMatch) {

        if(err){
            return done(err);
        }else{
            if(isMatch === true){
                if(req.body.new === req.body.second_new){
                    req.user.password = req.body.new;
                    req.user.save(function (err) {
                        if(err){
                            console.log(err);
                            res.redirect("/404");
                        }else{
                            req.flash("info", "Your password has been changed");
                            res.redirect("/" + req.user.role + "/home");
                        }
                    });

                }else{
                    req.flash("error", "New passwords are different");
                    res.redirect("change_passwd");
                }
            }else{
                req.flash("error", "Old password is incorrect");
                res.redirect("change_passwd");
            }
        }
    });
});

module.exports = router;