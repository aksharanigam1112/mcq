var express = require('express');
var bodyparser = require('body-parser');
const mysql = require('mysql');

var con;

var app = express();

const {userapp} = require('./routes/user');
const {adminapp} = require('./routes/admin');

app.use('/user',userapp);
app.use('/admin',adminapp);

app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

app.use(express.static(__dirname));
app.set('views',__dirname+"/views");
app.set('view engine' , 'hbs');



app.get('/',(req,res)=>
{
    res.render('main');
});

app.get('/login',(req,res)=>
{
    res.render('student_login');
});

app.get('/signup',(req,res)=>
{
    res.render('student_signup');
});


app.post('/stdsignup',(req,res)=>
{
    var user = req.body.stdusername;
    var pass = req.body.stdpassword;
    var email = req.body.stdemail;
    var contact = req.body.stdcontact;
    // console.log("Inside post");

    var sql = `Insert into student_signup (username , password , email,contact ) values("${user}","${pass}" , "${email}" , "${contact}");`;

    con.query(sql , function(err,result)
    {
            // if(err) throw(err);
        console.log("Result: "+JSON.stringify(result));
    });
    
});

app.post('/stdlogin',(req,res)=>
{
    var user = req.body.stdname;
    var pass = req.body.stdpass;
    
    var sql = `Select password from student_signup where username = "${user}";`;
    con.query(sql , function(err,result)
    {
        if(err) throw(err);
            var resu;
            result.forEach(e => 
            {
                resu =  e.password
                if (resu == pass)
                    console.log("Result: "+JSON.stringify(result));
                else
                    console.error('Login Failed');
            });
    });
    
});

app.listen(3000,(err)=>
{
    if(err) 
        throw(err);
    else
    {    
        console.log("http://localhost:3000");
        con = mysql.createConnection({
            host:'localhost' , 
            user:'aksharanigam',
            password:'test',
            database : 'mcq'
        });
        con.connect(function(err){
            if(err)
                throw err;
            else
                console.log('Connected');
        });
    }

});

