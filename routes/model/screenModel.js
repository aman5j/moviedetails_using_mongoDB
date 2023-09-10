var mongoose = require("mongoose")
var typesSchema = mongoose.Schema({

    cinemaid:{
        type:mongoose.Types.ObjectId,
        require:true,
        ref:"cinemas"
    },

    screenname:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("screen", typesSchema);
