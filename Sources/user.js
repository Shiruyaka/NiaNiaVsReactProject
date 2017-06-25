const express = require("express");
let ObjectID = require('mongodb').ObjectID;
let mongoose = require("mongoose");
const navibar = require("../user_navibar.json");
const path = require("path");
const router = express.Router();
const moment = require("moment");

router.use(function (req, res, next) {
    if(req.isAuthenticated()){
        if(req.user.role == 'user'){
            next();
        }else{

            res.redirect("/403");
        }
    }else{

        res.redirect("/401");
    }
});


router.use(function (req, res, next) {
    if(req.query.method == "DELETE"){
        req.method = 'DELETE';
        req.url = req.path;
    }

    next();
});

router.post("/home/:id_poke/:id_train", function (req, res) {
    app.schedule.remove({id_pokemon: req.params.id_poke}, function (err) {
        if(err){
            console.log(err);
        }else{
            console.log('usunięto');
        }
    });

    trainings.findOne({_id:req.params.id_train}, function (err, training) {
        if(err) {
            console.log(err)
        }else{
            app.statistics.findOne({id_pokemon: req.params.id_poke}).sort({date: -1}).limit(1).exec(function (err, stats) {
                if(err){
                    console.log(err);
                }
                else{
                    const new_stats = new app.statistics({
                        id_pokemon: req.params.id_poke,
                        health: training.health + stats.health,
                        agility: training.agility + stats.agility,
                        attack: training.attack + stats.attack,
                        defense: training.defence + stats.defense,
                        date: new Date()
                    });

                    new_stats.save(function (err) {
                        if(err){
                            console.log(err)
                        }else{
                            app.pokemons.findOne({_id:req.params.id_poke}, function (err, poke) {
                                if(err){
                                    console.log(err);
                                }else{
                                    poke.on_training = false;
                                    poke.save(function (err) {
                                        if(err) {
                                            console.log(err);
                                        }
                                    });


                                    req.flash("info", "Your pokemon came back from the training");
                                    res.redirect("/user/home");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

router.get("/home", function (req, res) {
    navibar["page"] = req.url;
    app.pokemons.find({on_training: true, id_user: req.user._id}, function (err, pokes) {
        if(err){
            console.log(err);
        }else{

            const ides = [];

            for(let i=0; i<pokes.length; i++){
                ides.push(pokes[i]._id.toString());
            }

            app.schedule.find({id_pokemon: {$in: ides}}, function (err, result) {
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                    navibar["page"] = req.url;
                    navibar["pokemons"] = result;
                    navibar["moment"] = moment;
                    res.render("user_home", navibar);
                }
            })
        }
    });
});

router.use(express.static(path.resolve(__dirname, "pokemon_images")));

router.get("/pokemons", function (req, res) {

    app.pokemons.find({id_user: req.user._id}, function (err, pokes) {
        if(err){
            console.log(err);
        }else{
            navibar["page"] = req.url;
            navibar["pokemons"] = pokes;
            res.render("user_pokemons", navibar);
        }
    });
});

router.get("/detail_pokemon/:id(\\w+)", function (req, res) {

    app.pokemons.findOne({_id: req.params.id}, function (err, pokemon) {
        if(err){
            console.log(err);
        }
        else{
            navibar["pokemon"] = pokemon;
            app.species.findOne({name: navibar["pokemon"].specie}, function (err, sp) {
                if(err){
                    console.log(err);
                }
                else{
                    navibar['sp'] = sp;

                    app.statistics.findOne({id_pokemon: navibar["pokemon"]._id}).sort({date: -1}).limit(1).exec(function (err, stats) {
                        if(err){
                            console.log(err);
                        }
                        else{

                            navibar["page"] = req.url;
                            navibar['stats'] = stats;
                            res.render("user_pokemon_detail", navibar);
                        }
                    });
                }
            });
        }
    });
});

router.get("/new_pokemon", function (req, res) {

    app.species.find({}, function (err, specie) {
        if(err){
            console.log(err);
        }else{
            res.render("user_new_pokemon", {specie: specie});
        }
    })
});

router.post("/new_pokemon", function (req, res, next) {

    const newPokemon = new app.pokemons({
        name: req.body.name,
        specie: req.body.sp,
        id_user: req.user._id,
        on_training: false
    });

    const new_Stats = new app.statistics({
        id_pokemon: newPokemon._id,
        health: Math.floor((Math.random() * 10) + 1),
        agility: Math.floor((Math.random() * 10) + 1),
        attack: Math.floor((Math.random() * 10) + 1),
        defense: Math.floor((Math.random() * 10) + 1),
        date: new Date()
    });

    new_Stats.save(function (err, resp) {
        if(err){
            console.log(err)
        }
        else{
            app.newPokemon.save(function (err, resp) {
                if(err){
                    console.log(err);
                }else{
                    req.flash("info", "You have added a new pokemon!");
                    res.redirect("/user/pokemons");
                }
            });
        }
    });
});


router.delete("/pokemon_detail/:id", function (req, res) {
    app.pokemons.find({_id: req.params.id}).remove(function () {
        req.flash("info", "You have deleted your pokemon :< ");
        res.redirect("/user/pokemons");
    });
});

router.get("/trainings", function (req, res) {
    navibar["page"] = req.url;

    app.pokemons.find({id_user: req.user._id, on_training: false}, function (err, pokes) {
        if(err){
            console.log(err);
        }else{
            navibar["page"] = req.url;
            navibar["pokemons"] = pokes;
            app.trainings.find({}, function (err, trainings) {

                if(err){
                    console.log(err)
                }else{
                    navibar["trainings"] = trainings;
                    res.render("user_trainings", navibar);
                }
            });
        }
    });
});

router.post("/trainings", function (req, res){
    if(req.body.optradio && req.body.pokemon){
        app.trainings.findOne({_id: req.body.optradio}, function (err, training) {

            app.pokemons.findOne({_id: req.body.pokemon}, function (err, pokemon_to_name) {
                if(err) console.log(err);
                else{
                    const date = new Date();
                    const newSchedule = new app.schedule({
                        id_pokemon: req.body.pokemon,
                        id_training: req.body.optradio,
                        end_date: new Date(date.getTime() + (60 * 1000 * training.duration)),
                        pokemon_name: pokemon_to_name.name
                    });

                    newSchedule.save(function (err) {
                        if(err){
                            console.log(err)
                        }else{
                            app.pokemons.findOne({_id:req.body.pokemon}, function (err, poke) {
                                poke.on_training = true;
                                poke.save(function (err) {
                                    if(err) {
                                        console.log(err);
                                    }
                                });
                                req.flash("info", "Your pokemon is on training");
                                res.redirect("/user/trainings");
                            })
                        }
                    });
                }
            });
        });
    }else {
        req.flash("info", "Please choose training.");
        res.redirect("/user/trainings");
    }
});



module.exports = router;