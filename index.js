var express = require('express')
var MongoClient = require('mongodb').MongoClient;
var querystring=require('querystring');
var app = express();
app.set('view engine', 'ejs');
var mongoose = require('mongoose');
var session=require('express-session');
var cookieParser=require('cookie-parser');
//mongoose.connect('mongodb://localhost:27017/studentdb');
var db = mongoose.connection;
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret:"shh,its a secret"}));
var alert=require('alert-node');
var sschema = mongoose.Schema({
    phone:Number,
    name:String,
    email:String,
    department:String,
    password:String,
    role:String,
});
var uschema = mongoose.Schema({
    Qno:Number,
    Qname:String,
    ans:String,
});
var uschema1 = mongoose.Schema({
    Qno:Number,
    Qname:String,
    ans:String,
});
var uschema2 = mongoose.Schema({
    Qno:Number,
    Qname:String,
    ans:String,
});


app.get('/', function(req, res){//app.all for all get adn post
   res.sendFile(__dirname+'/index.html');
});
app.post('/', function(req, res){
   /* var data="";req.on("data",function(chunk){data+=chunk;})req.on("end",function(chunk){//console.log(data);var q=querystring.parse(data);
    console.log(q);
    });*/

    
    var data=req.body;
    if(data.roleoptions=="STUDENT"){
    mongoose.connect('mongodb://localhost:27017/studentdb');
       var student = mongoose.model('student', sschema);
       var s=new student({
       phone:data.phonenumber,
       name:data.firstname,
       email:data.email,
       department:data.department,
       password:data.password,
       role:data.roleoptions
   });
       s.save(function (err, student) {
         if (err) return console.error(student);
         console.log('saved');
       });
    }
    else if(data.roleoptions=="TEACHER")
    {
        mongoose.connect('mongodb://localhost:27017/teacherdb');
        var teacher = mongoose.model('teacher', sschema);
        var s=new teacher({
        phone:data.phonenumber,
        name:data.firstname,
        email:data.email,
        department:data.department,
        password:data.password,
        role:data.roleoptions
    });
        s.save(function (err, teacher) {
          if (err) return console.error(teacher);
          console.log('saved');
        });

    }
       res.render('login');
 /*  console.log(data.phonenumber);
       console.log(data.firstname);
    console.log(data.email);
       console.log(data.department);
       console.log(data.password);
    console.log(data.roleoptions);*/
});
app.post('/login',function(req,res){
   
    res.render('login');
    
});
app.post('/homepage',function(req,res){
    if(req.body.roleoptions=="STUDENT"){
    mongoose.connect('mongodb://localhost:27017/studentdb');
    var student = mongoose.model('student', sschema);
    student.findOne({ 
        role:req.body.roleoptions,
        email: req.body.email,
        password:req.body.password }, function(err, user) {
          // hanlde err..
          if (user) {
            console.log('found'); 
            res.render('homepagestudent'); 
          } else {
            console.log('not found');
            alert('YOU NEED TO SIGN UP FIRST OR EMAIL OR PASSWORD IS INCORRECT');
            res.sendFile(__dirname+'/index.html');
          }
       });
    }
    if(req.body.roleoptions=="TEACHER"){
        mongoose.connect('mongodb://localhost:27017/teacherdb');
        var teacher = mongoose.model('teacher', sschema);
        teacher.findOne({ 
            role:req.body.roleoptions,
            email: req.body.email,
            password:req.body.password }, function(err, user) {
              // hanlde err..
              if (user) {
                console.log('found'); 
                res.render('homepageteacher'); 
              } else {
                console.log('not found');
                alert('YOU NEED TO SIGN UP FIRST OR EMAIL OR PASSWORD IS INCORRECT');
                res.redirect(__dirname+'/index.html');
              }
           });
        }
        if(req.body.roleoptions=="ADMIN"){
            mongoose.connect('mongodb://localhost:27017/admindb');
            var admin = mongoose.model('admin', sschema);
            admin.findOne({ 
                role:req.body.roleoptions,
                email: req.body.email,
                password:req.body.password }, function(err, user) {
                  // hanlde err..
                  if (user) {
                    console.log('found'); 
                    res.render('homepageadmin'); 
                  } else {
                    console.log('not found');
                    alert('YOU NEED TO SIGN UP FIRST OR EMAIL OR PASSWORD IS INCORRECT');
                    res.sendFile(__dirname+'/index.html');
                  }
               });
            }
   // 
});
app.get('/homepage/view/student',function(req,res){
    mongoose.connect('mongodb://localhost:27017/studentdb');
    var student = mongoose.model('student', sschema);
    student.find({},function(err,students){
        if(err)
        res.json(err);
        else
        res.render('adminstudent',{students:students});
        mongoose.connection.close();
    });


});
app.get('/homepage/view/teacher',function(req,res){
    mongoose.connect('mongodb://localhost:27017/teacherdb');
    var teacher = mongoose.model('teacher', sschema);
    teacher.find({},function(err,teachers){
        if(err)
        res.json(err);
        else{
        res.render('adminteacher',{teachers:teachers});
        mongoose.connection.close();
        }
    });


});
app.get('/homepage/view/admin',function(req,res){
    mongoose.connect('mongodb://localhost:27017/admindb');
    var admin = mongoose.model('admin', sschema);
    admin.find({},function(err,admins){
        if(err)
        res.json(err);
        else
        res.render('adminview',{admins:admins});
        mongoose.connection.close();
    });


});
app.get('/homepage/view/java',function(req,res){
    mongoose.connect('mongodb://localhost:27017/javadb');
    var juser= mongoose.model('juser', uschema1);
    juser.find({},function(err,jusers){
        if(err)
        res.json(err);
        else
        res.render('adminjava',{jusers:jusers});
        mongoose.connection.close();
    });


});
app.get('/homepage/view/apc',function(req,res){
    mongoose.connect('mongodb://localhost:27017/apcdb');
    var user= mongoose.model('user', uschema);
    user.find({},function(err,users){
        if(err)
        res.json(err);
        else
        res.render('adminapc',{users:users});
        mongoose.connection.close();
    });


});
app.get('/homepage/view/ds',function(req,res){
    mongoose.connect('mongodb://localhost:27017/dsdb');
    var duser= mongoose.model('duser', uschema2);
    duser.find({},function(err,dusers){
        if(err)
        res.json(err);
        else
        res.render('adminds',{dusers:dusers});
        mongoose.connection.close();
    });


});
app.get('/apc',function(req,res){

mongoose.connect('mongodb://localhost:27017/apcdb');
var user = mongoose.model('user',uschema);
user.find({},function(err,users){
        if(err)
        res.json(err);
        else
        res.render('apc',{users:users});
        mongoose.connection.close();
    });
   /* var users=[{
        Qno:'1',
        Qname:'Does fopen function needs file name?(yes/no)',
        ans:'yes',
        },
        {
        Qno:'2',
        Qname:'If there is any error while opening a file, fopen will return?(null/EOF)',
        ans:'null',
    },
    {
        Qno:'3',
        Qname:'Which mode is used to overwrite the contents of an existing file?',
        ans:'a',
    },
    {
        Qno:'4',
        Qname:' fclose(fp1,fp2) will give compiler error',
        ans:'yes',
    },
    {
        Qno:'5',
        Qname:'which function in file system gives current position in the file?',
        ans:'ftell()',
    }
    ];
   
    res.render('example', {
        users: users,
    });*/
  
});
app.get('/java',function(req,res){
    mongoose.connect('mongodb://localhost:27017/javadb');
var juser = mongoose.model('juser',uschema1);
juser.find({},function(err,jusers){
        if(err)
        res.json(err);
        else
        res.render('java',{jusers:jusers});
        mongoose.connection.close();
    });
    
  
});
app.get('/ds',function(req,res){
    mongoose.connect('mongodb://localhost:27017/dsdb');
var duser = mongoose.model('duser',uschema2);
duser.find({},function(err,dusers){
        if(err)
        res.json(err);
        else
        res.render('ds',{dusers:dusers});
        mongoose.connection.close();
    });
});
app.get('/pra',function(req,res){
    res.render('pra'); 
});


app.listen(3000); 