/**
 * Created by tomas on 21.04.2017.
 */
var express = require("express");
var path = require("path");
var passport = require("passport");
var bodyParser = require('body-parser');
var router = express.Router();
const User = require("./Models/user");
import actions_const from "../ActionConstants";

router.use(bodyParser.json());


router.get("/signup", function (req, res) {
    user.find(function (err, users) {
        if(err){
            console.log(err);
        }
        else{
            var logins = [];
            for(let i=0; i<users.length; i++){
                logins.push(users[i].username.toString().toLowerCase());
            }
            console.log(logins);
            res.json(
                {
                    users: logins
                });
        }

    })
});

router.post("/signup", function (req, res, next) {

    let username = req.body.username;
    let password = req.body.password;
    let first_name = req.body.firstname;
    let last_name = req.body.lastname;

    User.findOne({username: username}, function (err, user) {

        if (err) {
            return next(err);
        }
        if (user) {

            res.json(
                {type: actions_const.USERNAME_TAKEN}
            )
        }
        else {
            let newUser = new User({
                username: username,
                password: password,
                first_name: first_name,
                last_name: last_name,
                role: "user"
            });

            newUser.save(function (err, resp) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({
                        type: actions_const.CREATING_ACCOUNT_SUCCESS
                    })
                }
            });
        }
    });
});



/*, passport.authenticate("login", {
 successRedirect: "/",
 failureRedirect: "/signup",
 failureFlash   : true
 })*/

module.exports = router;