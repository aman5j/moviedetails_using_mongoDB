var mongoose = require('mongoose')
var typesSchema = mongoose.Schema({

    stateid:{
        type:mongoose.Types.ObjectId,
        require:true,
        ref:"states"
    },

    cityname:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("cities",typesSchema)
