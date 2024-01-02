const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    productImage:{
        type:String,
        required:true
    },
    image_id:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true,
        default:0
    },
    
    stock:{
        type:Number,
        default:0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categories',
        
        required:true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users', 
        required:true,
    },


},{timestamps:true})
exports.Product = mongoose.model("Product",productSchema)