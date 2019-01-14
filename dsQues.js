var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dsdb');
var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function() {
    console.log("Connection Successful!");
    var uschema = mongoose.Schema({
        Qno:Number,
        Qname:String,
        ans:String,
    });
    var duser = mongoose.model('duser', uschema);
    var nusers=[{
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
  duser.insertMany(nusers,function(err,docs){
      if(err)return console.error(err);
      else 
      console.log("saved");
  });
});
    