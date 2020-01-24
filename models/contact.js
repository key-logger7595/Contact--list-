//requiring mongoose because we are creating schema for mongoose 
const mongoose = require('mongoose');


// creating the schema for mongoose
const contactSchema = new mongoose.Schema({
   
    name: {
        type: String ,
        required:true 
    },

    phone: {
        type:String,
        required:true 
    }

});

// creating the collection name in db 
//'Contact' is the name given to db in actual database 

const Contact = mongoose.model('Contact',contactSchema);

// now simply exporting our collection in main express file 

module.exports = Contact;
