const express = require('express');
const router = express.Router();
const {check} =  require('express-validator');

const {signout, signup, signin, isSignedIn} = require('../controllers/authentication');
//signup route
router.post("/signup",
[  
    //validators
    check('name').isLength({min:3}).withMessage('Name length should be 3 or more'),
    check('email').isEmail().withMessage('Please provide a valid email'),
    check('password').isLength({min:6}).withMessage('Minimum password length should be 6'),
    check('phone').isNumeric().isLength({max:11}).withMessage('Please provide a valid phone number')
]
,signup);

router.post('/signin',
[
    //validators
    check('email').isEmail().withMessage('Please provide a valid email'),
    check('password').isLength({min:6}).withMessage('Minimum password length should be 6')
]
,signin);

router.get('/signout',signout);


// router.post('/resetPassword',
// [
//     //validators
    
// ])

module.exports = router;