const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    productId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    } 
}) 


const orderSchema = new mongoose.Schema({
    orderPrice:{
        type:Number,
        required:true
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    orderItems:{
        type:[orderItemSchema]
    },
address:{
    type:String,
    required:true
},
status:{
    type:String,
    enum:['Delivered','Pending','Cancelled'],
    default:'Pending'
}

},{timestamps:true})
exports.Order = mongoose.model("Order",orderSchema)