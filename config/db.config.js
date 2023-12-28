const mongoose = require('mongoose');
require('dotenv').config()
exports.DbConnect = ()=>{
    mongoose.connect(process.env.DB_URI).then(()=>{
        console.log('connected to the database ');
    }).catch((err)=>{
        console.log(err?.message);
    })
}