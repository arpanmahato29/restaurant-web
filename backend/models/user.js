const mongoose = require('mongoose');
const crypto = require('crypto');
const {v1 : uuidv1} = require('uuid');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true
        },
        email:{
            type:String,
            required: true,
            trim: true,
            unique: true,
            maxlength: 100
        },
        phone: {
            type:String,
            required:true,
            maxlength: 11,
            unique: true
        },
        address:{
            type: String,
            default:""
        },
        encry_password:{
            type:String,
            required:true,
        },
        salt: String,
        role:{
            type: Number,
            default: 0
        },
        //TODO: have to work after the order backend 
        productInCart : {
            type:Array,
            default: []
        },
        orders:{
            type: Array,
            default:[]
        }
    },
    {
        timestamps:true
    }
);

userSchema
.virtual('password')
.set(function(password){
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
})
.get(function(){
    return this._password;
}) ;

userSchema.methods = {
    authenticate: function(plainPassword){
        return this.securePassword(plainPassword) === this.encry_password;
    },

    securePassword: function (plainPassword) {
        if(!plainPassword) return "";
        try{
            return crypto
            .createHmac("sha256",this.salt)
            .update(plainPassword)
            .digest("hex");
        } catch (error){
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);