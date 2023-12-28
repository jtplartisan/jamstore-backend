const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 10,
      maxlength: 10,
      match: /^[0-9]{10}$/,
    },
    alternatePhone: {
      type: String,
      trim: true,
      minlength: 10,
      maxlength: 10,
      match: /^[0-9]{10}$/, 
    },
    shopCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
      required: function () {
        return this.role === 'vendor';
      },
    },
    gstNumber: {
      type: String,
      required: function () {
        return this.role === 'vendor';
      },
      unique: true,
      trim: true,
      minlength: 15,
      maxlength: 15,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'vendor' ],
      default: 'user',
    },
    shopName: {
      type: String,
      required: function () {
        return this.role === 'vendor';
      },
    },
    password: {
      type: String,  
      required: true,
      minlength: 6,
    },
  },{timestamps:true})

const User = mongoose.model('User',UserSchema)

module.exports = User 