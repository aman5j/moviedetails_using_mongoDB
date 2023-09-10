var mongoose = require("mongoose");
var typesSchema = mongoose.Schema({

    stateid:{
        type:mongoose.Types.ObjectId,
        require:true,
        ref:"states"
    },

    cityid:{
        type:mongoose.Types.ObjectId,
        require:true,
        ref:"cities"
    },

    cinemaid:{
        type:mongoose.Types.ObjectId,
        require:true,
        ref:"cinemas"
    },

    screenid:{
        type:mongoose.Types.ObjectId,
        require:true,
        ref:"screens"
    },

    moviename:{
        type:String,
        require:true
    },

    description:{
        type:String,
        require:true
    },

    status:{
        type:String,
        require:true
    },

    poster:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("movies", typesSchema)
