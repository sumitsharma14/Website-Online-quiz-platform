/*var nuser=new user({
    phone:'9815194583',
    name:'sumit',
    email:'sumzsharma6@gmail.com',
    department:'CSE',
    password:'12345',
    role:'admin'
});
nuser.save();
console.log('hello');*/


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/admindb');
var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function() {
    console.log("Connection Successful!");
    var uschema = mongoose.Schema({
        phone:Number,
        name:String,
        email:String,
        department:String,
        password:String,
        role:String,
    });
    var user = mongoose.model('admin', uschema);
    var nuser=new user({
    phone:'9815194583',
    name:'sumit',
    email:'sumzsharma6@gmail.com',
    department:'CSE',
    password:'12345',
    role:'ADMIN'
});
    nuser.save(function (err, user) {
      if (err) return console.error(err);
      console.log('saved');
    });
    
});
 