/**
 * Created by tomas on 19.04.2017.
 */
const express = require("express");
const router = express.Router();
import action_const from "../ActionConstants"
const passport = require("passport");
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

router.post("/login", passport.authenticate("login", {failWithError: true} ), function (req, res) {
    res.json(
        {
            type: action_const.LOGIN_SUCCESS,
            user: req.user
        })
});

router.use(function(err, req, res, next){
    res.status(401).json({type: action_const.LOGIN_FAILED});
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "You must be logged in to see this page.");
        res.redirect("/login");
    }
}

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

module.exports = router;