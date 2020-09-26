const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema(
    {
        code:{
            type:String,
            maxlength:8,
            unique:true,
            trim:true,
            required:true
        },
        description:{
            type:String,
            maxlength: 100,
            required:true,
        },
        minAmount:{
            type:Number,
            required:true,
            trim:true,
        }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model("Offer",offerSchema);