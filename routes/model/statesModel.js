var mongoose = require('mongoose')
var typesSchema = mongoose.Schema({

    statename:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("states",typesSchema)
