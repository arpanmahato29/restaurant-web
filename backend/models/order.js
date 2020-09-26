const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productCartSchema = new mongoose.Schema(
    {
        product:{
            type:ObjectId,
            ref: "Prodduct"
        },
        name:String,
        count:Number,
        price:Number,
    }
);

const ProductCart = mongoose.moodel("ProductCart",productCartSchema);

const OrderSchema = new mongoose.Schema(
    {
        products:[productCartSchema],
        transaction_id:String,
        amount:{type:Number},
        status:{
            type:String,
            default:"Recieved",
            enum:["Cancelled","Delivered","Processing"]
        },
        update:Date,
        user:{
            type:ObjectId,
            ref:"User"
        }
    }
    {
        timestamps:true
    }
)

const Order = mongoose.model("Order",OrderSchema);

module.exports = {ProductCart, Order};