const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const restaurantSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            required:true,
            maxlength: 32,
            unique:true
        },
        owner:{
            type: ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps:true,
    }
)

module.exports = mongoose.model("Restaurant", restaurantSchema);