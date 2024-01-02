const mongoose = require('mongoose');



const PaymentSchema = new mongoose.Schema({
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
ref:'Order',
        required:true
    },
    paymentStatus:{
        type:Boolean,
        default: false
    },

},{timestamps:true})

exports.Payment = mongoose.model("Payment",PaymentSchema)