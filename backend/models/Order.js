const mongoose = require('mongoose');


const singleOrderItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    price:{
        type:Number,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'Products',
        required:true,
    },
})

const OrderSchema = new mongoose.Schema({
    tax: {
        type: Number,
        required: true,
      },
      shippingFee: {
        type: Number,
        required: true,
      },
      address:{
        type:Object, 
        required:true,
      },
      subtotal: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
      
      orderItem:[singleOrderItemSchema],

      orderInfo:{
        type:Object,
        required:true
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
      },
      clientSecret: {
        type: String, 
      },
      paymentIntentId: {
        type: String,
      },
},{timestamps:true})

module.exports = mongoose.model("Order",OrderSchema);