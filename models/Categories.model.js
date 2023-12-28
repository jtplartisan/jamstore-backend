const mongoose = require('mongoose');

const categorySchema  = new mongoose.Schema({
    category:{
        type:String,
        required:true
    }
},{timestamps:true})
exports.Category = mongoose.model("Category",categorySchema )