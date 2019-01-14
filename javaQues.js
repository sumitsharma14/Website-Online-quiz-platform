var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/javadb');
var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function() {
    console.log("Connection Successful!");
    var uschema = mongoose.Schema({
        Qno:Number,
        Qname:String,
        ans:String,
    });
    var juser = mongoose.model('juser', uschema);
    var nusers=[{
    Qno:'1',
    Qname:'Which class cannot be subclassed (or extended) in java?',
    ans:'abstract',
    },
    {
    Qno:'2',
    Qname:'Can we declare abstract static method(yes/no)?',
    ans:'no',
},
{
    Qno:'3',
    Qname:'Can we access private class outside the package(yes/no)?',
    ans:'no',
},
{
    Qno:'4',
    Qname:'Suspend thread can be revived by using?',
    ans:'resume()',
},
{
    Qno:'5',
    Qname:'Runnable is',
    ans:'interface',
}
/*{
    Qno:'6',
    Qname:'Can we declare abstract static method(yes/no)';
    ans:'no',
}
{
    Qno:'7',
    Qname:'Can we declare abstract static method(yes/no)';
    ans:'no',
}
{
    Qno:'8',
    Qname:'Can we declare abstract static method(yes/no)';
    ans:'no',
}
{
    Qno:'9',
    Qname:'Can we declare abstract static method(yes/no)';
    ans:'no',
}
{
    Qno:'10',
    Qname:'Can we declare abstract static method(yes/no)';
    ans:'no',
}*/
];
  juser.collection.insertMany(nusers,function(err,docs){
      if(err)return console.error(err);
      else 
      console.log("saved");
  });
});
    