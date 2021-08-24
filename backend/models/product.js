const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            required:true,
            maxlength: 64,
        },
        description: {
            type: String,
            trim: true,
            maxlength: 2000
        },
        price: {
            type:Number,
            required:true,
            trim: true
        },
        category:{
            type: ObjectId,
            ref: 'Category',
            required: true
        },
        owner:{
            type:ObjectId,
            ref:'User',
            required:true,
        },
        restaurant:{
            type: ObjectId,
            ref: 'Restaurant',
            required: true
        },
        stock:{
            type: Number
        },
        sold:{
            type: Number
        },
        photo:{
            data: Buffer,
            contentType: String,
        },
        rating:{
            type:Number,
            default: 0,
            max: 5
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Product", productSchema);