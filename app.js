/**
 * Created by tomas on 19.04.2017.
 */

import express from "express";
import mongoose from "mongoose";
import path from "path";
import bodyParser from "body-parser";
import storeFactory from "./Store";
import { renderToString } from 'react-dom/server'
import React from "react";
import { Provider } from 'react-redux'

import { App, Header } from "./Sources/Components/Containers";

const training = require("./Sources/Models/training");
const user = require("./Sources/Models/user");
const specie = require("./Sources/Models/specie");
const pokemons = require("./Sources/Models/pokemon");
const statistic = require("./Sources/Models/statistic");
const schedule = require("./Sources/Models/schedule");

let app = express();
app.set("specie", specie);
app.set("training", training);
app.set("pokemon", pokemons);
app.set("user", user);

let cookieParser = require("cookie-parser");
let session = require("express-session");
let flash = require("connect-flash");
let passport = require("passport");
let setUpPassport = require("./Sources/set_up_passport");
let logger = require("morgan");
let signup = require("./Sources/sign-up");
let routes = require("./Sources/utils");
let admin = require("./Sources/admin");
let crypto = require("crypto");
let profil = require("./Sources/profil");


const serverStore = storeFactory(true, {});
const fileAssets = express.static(path.join(__dirname, '../../dist/assets'));

const renderComponentsToHTML = ({store}) =>
    ({
        state: (store.getState()),
            html: renderToString(
            <Provider store={store}>
                    <App />
            </Provider>
        )
    });

const makeClientStoreFrom = store => url =>
    ({
        url,
        store: storeFactory(false, store.getState())
    });


const addStoreToRequestPipeline = (req, res, next) => {
    req.store = serverStore;
    next();
};

mongoose.connect("mongodb://localhost:27017/pokemonAcademy");


setUpPassport();


app.set("port", 3002);



app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: "b1bf814e4cde5bcbf5bdaf6ece05f80034e844a72017b3b60ace6c14d07d91d0",
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);
app.use(signup);



app.use(express.static(path.resolve(__dirname, "images")));
app.use(express.static(path.resolve(__dirname, "assets")));

app.use("/assets", express.static('assets'));

app.use(express.static(path.resolve(__dirname, "Stylesheets")));

app.use("/Stylesheets", express.static('Stylesheets'));

app.use(function (req, res, next) {

    console.log(path.resolve(__dirname, "assets", "bundle.js"));
    if(req.query.method == "PATCH"){
        req.method = "PATCH";
        req.url = req.path;
    }

    next();
});


function renderFullPage(html, preloadedState) {
    return `
    <!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="Stylesheets/styles.css">
    <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />
  <meta charset="utf-8">
  <title>Pokemon Ranch</title>
</head>
<body>
    <div id="root">${html}</div>
    <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>
    <script src="assets/bundle.js"></script>
</body>
</html>
    `
}

app.get("/", function (req, res) {
    /*if(req.isAuthenticated()){
        res.redirect("/" + req.user.role + "/" + "home");
    }else{
        res.render("index");
    }*/

    // Render the component to a string
    const html = renderToString(
        <Provider store={serverStore}>
            <App />
        </Provider>
    );

    // Grab the initial state from our Redux store
    const preloadedState = serverStore.getState();


    console.log((serverStore));
    res.status(200).send(renderFullPage(html, preloadedState));
});

app.use("/admin", admin);
app.use("/user", user);
app.use("/profile", profil);

app.get("/401", function (req, res) {
    res.statusCode = 401;
    res.status(401).send("401");
});

app.get("/403", function (req, res) {
    res.statusCode = 403;
    res.status(403).send("403");
});

app.use(function (req, res) {
    res.statusCode = 404;
    res.status(404).send("404");
});

app.listen(app.get("port"), function () {
   console.log("Server is started on port" + app.get("port"));
});
