const mongoose = require("mongoose");

const specieSchema = mongoose.Schema(
    {
        name: {type:String, unique:true},
        photo: {type:String, required:true}
    }
);

const Specie = mongoose.model("Specie", specieSchema);
module.exports = Specie;