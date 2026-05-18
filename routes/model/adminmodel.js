const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    emailid: String,
    mobileno: String,
    password: String,
    adminname: String
});

module.exports = mongoose.model("Admin", adminSchema);