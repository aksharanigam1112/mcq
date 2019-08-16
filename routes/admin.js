var express = require('express');
var adminapp = express.Router();

adminapp.get('/',(req,res)=>
{
    res.send("In admin.js");
});

module.exports = {
    adminapp : adminapp           // key : value 
};
