// require a library 
const mongoose = require('mongoose');
// connect to database
mongoose.connect('mongodb://localhost/contact_list_db'); //contact_list_db is the name of database 

// acquiring the connection
// the connection between moongoose and the database  is db 
const db = mongoose.connection ;

// error handling 

db.on('error',console.error.bind(console,'error connecting to db'));



//up and running and printing the message 

db.once('open',function(){
    console.log('Succesfully connected to database');
});


//at the end remember to put this file in our express index file .





