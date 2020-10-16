// importing user schema
const User = require('../models/user');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req,res) => {
    //checking for validations
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    const user = new User(req.body);
    //saving user to database
    user.save((error, user) => {
        if(error){
            return res.status(400).json({
                error: "Unable to store in DataBase"
            })
        }
        
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    });
}

exports.signin = (req,res) => {
    //validator
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    //destructuring the req
    const {email, password} = req.body;
    User.findOne({email} , (error, user) => {
        if(error || !user){
            return res.status(400).json({
                error: "No such user exist. Please sign up and enjoy your meal."
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }

        // create token
        const token = jwt.sign({_id:user._id}, process.env.SECRET);
        //put token in cookie
        res.cookie('token',token,{expire: new Date() + 30});

        //send response to front end
        const {_id, nam, email, role, phone, address} = user;
        return res.status(200).json({token,user:{_id, nam, email, role, phone, address}});
    })
}

exports.signout = (req,res) => {
    res.clearCookie('token');
    res.json({
        message:'User signed out successfully'
    });
}

//protected routes 
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms:['HS256']
});

//custom middlewares
exports.isAuthenticated = (req,res,next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: 'ACCESS DENIED'
        });
    }
    next();
}

exports.isSeller = (req,res,next) => {
    if(req.profile.role === 0 ){
        return res.status(403).json({
            error: "ACCESS DENIED."
        })
    }
    next();
}
exports.isAdmin = (req,res,next) => {
    if(req.profile.role !== 2){
        return res.status(403).json({
            error: "ACCESS DENIED."
        })
    }
    next();
}