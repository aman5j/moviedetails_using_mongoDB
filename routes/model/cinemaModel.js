var mongoose = require("mongoose")
var typesSchema = mongoose.Schema({

    cinemaname:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("cinema", typesSchema);
