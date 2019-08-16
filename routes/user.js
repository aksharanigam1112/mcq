var express = require('express');
var userapp = express.Router();

userapp.get('/',(req,res)=>
{
    res.send("In user.js");
});

module.exports = {
    userapp : userapp           // key : value 
};
