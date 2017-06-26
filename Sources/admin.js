/**
 * Created by Ola on 2017-04-30.
 */
const express = require("express");
const multer = require("multer");
const navibar = require("../navibar.json");
const path = require("path");
const fs = require('fs');
import action_constans from "../ActionConstants"
const router = express.Router();

const upload = multer({dest: 'pokemon_images/'});

router.use(function (req, res, next) {

    console.log(req.user);

    if(req.isAuthenticated()){

        if(req.user.role == 'admin'){
            next();
        }else{
            res.redirect("/403");
        }
    }else{
        console.log("TUU");
        res.redirect("/401")
    }
});

router.use(function (req, res, next) {
    if(req.query.method == "DELETE"){
        req.method = 'DELETE';
        req.url = req.path;
    }
    else if(req.query.method == "PATCH"){
        req.method = "PATCH";
        req.url = req.path;
    }
    else if(req.query.method == "PUT"){
        req.method = "PUT";
        req.url = req.path;
    }

    next();
});


router.get("/home", function (req, res) {
    app.pokemons.find({}, function (err, pokes) {
        if(err) console.log(err);
        else{
            app.pokemons.find({on_training: true}, function (err, pokes_on_training) {
                if(err) console.log(err);
                else{
                    app.users.find({}, function (err, users_in_academy) {
                        if(err) console.log(err);
                        else{
                            app.specie.find({}, function (err, species_in_academy) {
                                if(err) console.log(err);
                                else{
                                    app.training.find({}, function (err, trainings) {
                                        if(err) console.log(err);
                                        else{
                                            navibar["page"] = req.url;
                                            navibar["pokemons"] = pokes.length;
                                            navibar["on_traingind"] = pokes_on_training.length;
                                            navibar["users"] = users_in_academy.length;
                                            navibar["specie"] = species_in_academy.length;
                                            navibar['trainings'] = trainings.length;
                                            res.render("admin_home", navibar);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

router.get("/pokemons", function (req, res) {
    const specie = req.app.get("specie");
    specie.find({}, function (err, pokemons) {
        if(err)
        { res.send(err); }
        else
        {
            navibar["page"] = req.url;
            navibar["pokemonsList"] = pokemons;


            console.log(pokemons);

            res.json({ type: action_constans.POKEMON_ADMIN,
            pokemons: pokemons});
            //res.render("admin_pokemons", navibar);
        }
    })
});


router.get("/trainings", function (req, res) {

    const training = req.app.get("training")
    training.find({}, function (err, trainings) {
        if(err){
            res.send(err);
        }else{
            console.log(trainings);

            res.json({ type: action_constans.TRAINING_ADMIN,
                trainings: trainings});
        }
    });
});

router.use(express.static(path.resolve(__dirname, "pokemon_images")));

router.post("/add_pokemon", upload.single('file'), function (req, res) {
    const file = path.resolve(req.file.path + '.' + req.file.mimetype.split('/')[1]);
    const specie = req.app.get("specie");
   fs.rename(req.file.path, (file), function (err) {
       if(err){
           console.log(err);
       }else{

           const newSpecie = new specie({
               name: req.body.name,
               photo: req.file.filename + '.' + req.file.mimetype.split('/')[1]
           });

           newSpecie.save(function (err, resp) {
                 if(err){
                     console.log(err);
                 }else{
                     req.flash("info", "New spiece has been added");
                     res.json({
                         type: action_constans.NEW_POKEMON_ADDED
                     });

                 }
             });
       }
   })
});

router.delete("/edit_pokemon/:id", function (req, res) {
    const specie = req.app.get("specie");
    const pokemon = req.app.get("pokemon");
    specie.findOne({_id:req.params.id}, function (err, spiece) {
        if(err){
            console.log(err);
        }else{

            pokemon.find({specie: spiece.name}, function (err, pokes) {
                if(err){
                    console.log(err);
                }else{
                    console.log(pokes);
                    if (pokes.length == 0) {
                        fs.unlink(path.resolve("pokemon_images", spiece.photo), function () {
                            spiece.remove(function (err, resp) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.json({ type: action_constans.ON_ADMIN_DELETE_POKEMON_SUCCESS,
                                    deleted_id: req.params.id});
                                }
                            });
                        });
                    }else{
                        res.json({ type: action_constans.ON_ADMIN_DELETE_POKEMON_FAILED});
                    }
                }
            });

        }
    });
});

router.get("/edit_pokemon/:id(\\w+)", function (req, res) {
    app.specie.findOne({_id:req.params.id}, function (err, pokemon) {
        if(err){
            console.log(err);
        }else{
            req.flash("info", "Spiece has been edited");
            res.render("admin_edit_pokemon", {pokemon: pokemon});
        }

    })
});


router.get("/add_pokemon", function (req, res) {
    res.render("admin_add_pokemon");
});

router.get("/edit_training/:id", function (req, res) {
    app.training.findOne({_id:req.params.id}, function (err, training) {
        if(err){
            console.log(err);
        }else{
            res.render("edit_training", {training:training});
        }
    });
});

router.patch("/edit_training/:id", function (req, res) {
    app.training.findOne({_id:req.params.id}, function (err, training) {
        if(err){
            console.log(err);
        }else{
            training["name"] = req.body.name;
            training["health"] = req.body.health;
            training["agility"] = req.body.agility;
            training["attack"] = req.body.attack;
            training["defence"] = req.body.defence;
            training['duration'] = req.body.duration;

            training.save(function (err, resp) {
                if(err){
                    console.log(err);
                }else{
                    req.flash("info", "Training has been edited");
                    res.redirect("/admin/trainings");
                }
            });
        }

    })
});

router.delete("/edit_training/:id", function (req, res) {
    app.training.find({_id: req.params.id}).remove(function () {
        req.flash("info", "Training has been deleted");
        res.redirect("/admin/trainings");
    });
});



router.post("/new_training", function (req, res, next) {

    const newTraining = new app.training({
        name: req.body.name,
        health: req.body.health,
        agility: req.body.agility,
        attack: req.body.attack,
        defence: req.body.defence,
        duration: req.body.duration
    });

    newTraining.save(function (err, resp) {
        if(err){
            console.log(err);
        }else{
            req.flash("info", "Training has been added");
            res.redirect("/admin/trainings");
        }
    })

});

router.get("/new_training", function (req, res) {
    res.render("new_training");
});

router.get("/users", function (req, res) {
   navibar["page"] = req.url;

    app.users.find({}, function (err, users) {
       if(err){
           console.log(err);
       }else{
           navibar["users"] = users;
           res.render("admin_user", navibar);
       }
    });

});

router.post("/new_admin", function (req, res, next) {

    const newUser = new app.users({
        username: req.body.username,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        role: "admin"
    });

    newUser.save(function (err, resp) {
        if(err){
            console.log(err);
        }else{
            req.flash("info", "New admin has been added");
            res.redirect("/admin/users");
        }
    })

});

router.delete("/edit_user/:id", function (req, res) {
    app.users.findOne({_id: req.params.id}).remove(function () {
        req.flash("info", "User has been deleted");
        res.redirect("/admin/users");
    });
});

router.get("/edit_user/:id", function (req, res) {
   app.users.findOne({_id: req.params.id}, function (err, user) {
       if(err){
           console.log(err);
       }else{
           res.render("edit_user", {user: user});
       }
   });
});

router.patch("/edit_user/:id", function (req, res) {
    app.users.findOne({_id: req.params.id}, function (err, user) {
        user["username"] = req.body.username;
        user["first_name"] = req.body.first_name;
        user["last_name"] = req.body.last_name;
        user["role"] = req.body.role;

        user.save(function (err, resp) {
            if(err){
                console.log(err);
            }else{
                req.flash("info", "User has been edited");
                res.redirect("/admin/users");
            }
        })
    });
});

router.get("/new_admin", function (req, res) {
    res.render("new_admin");
});

module.exports = router;