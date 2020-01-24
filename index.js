const express = require('express');
const path = require('path'); // modules for file systems 

const port =9000;

// Accessing the config moongoose file 
const db = require('./config/mongoose');


//accesing the db schema collection 
const Contact = require('./models/contact');

const app = express();

//how to setup EJS we need to tell express that 
//ejs is template engine we will use 

app.set('view engine','ejs'); // set sets the property view engine as ejs .

// now we will need to place views in directory (or where we will be placing our templates.)
app.set('views',path.join(__dirname,'views'));

//using parser (middleware)
app.use(express.urlencoded());

//Accessing static files 
app.use(express.static('assests'));

//using middleware

//creating our own middlewares .
// app.use(function(req,res,next){
//   console.log("Middleware 1 called");
//   next();
// });

// app.use(function(req,res,next){
//   console.log("middleware 2 called")
//   next();
// })

//CREATING A CONTACT list .

var contactList = [


    { 
      name:"rohan",
      phone:"9718315383"
    } ,

    {
      name:"chaman",
      phone:"8867348975934"
    } ,
    {
      name :"sarit",
      phone: "67567886594"  
    } ,
    {
      name:"vipul",
      phone:"12123534627"
    }

]


//app.get is kind of a controller for any request 
app.get('/',function(req,res){
  console.log('index page');
  res.send('<h1>Cool it is running !or is it?</h1>')

});


//app.get is kind of a controller for any request from profile page 
app.get('/profile',function(req,res){

    //rendering A file(Sending response ejs template or view) 
    
       Contact.find({},function(err,contacts){  // these empty curly braces are used to put query(or conditions ) to fetch specific data from database
            if(err){
              console.log('error in fetching contacts from db ');
              return;
            } 
            return res.render('home',{ 
                title:"My Contact List 2" ,
                contact_list: contacts
            });

            
        });

    // return res.render('home',{ 
    //   title:"My Contact List 2" ,
    //   contact_list: contactList 
    // }); // This title is simply creating an object and sending it to ejs
       //as we have put title as dyanamic variable in our ejs file 
  
  });

//creating controller for practice.ejs 

app.get('/practice',function(req,res){

  return res.render('practice',{title:"let us play with EJS"});
});

app.post('/create-contact',function(req,res){
    
    // //appending to our contact list
    // contactList.push({
    //   name:req.body.name,
    //   phone:req.body.phone 
    // });
    // // contactList.push(req.body);
   // now creating contacts in db 
 
     
    
       Contact.create({
        name: req.body.name,               // these two lines can be replaced with req.body
        phone: req.body.phone               // we are writing name and phones as descibed in our schema 
      }, function(err, newContact){
        if(err)
        {
          console.log('Error in creating a contact!');
          return;
          }
            console.log('******', newContact);
            return res.redirect('back');
    });
          
    

    //return res.redirect('back');

   //  return res.redirect('/practice');   
});


//for query params and params 
//important to remember while using params is that if we comment 
//our express.url encoded then we will have no effect 
//because that middleware only helps us to read data from 
//form request using post 
//app.get('/delete-contact/:phone/:name',function(req,res){
//   // console.log(req.params);
//   let phone = '' ;

// });

//form rquest using query params 
app.get('/delete-contact',function(req,res){
                      
  
  let id = req.query.id ;

  Contact.findByIdAndDelete(id,function(err){

    if(err){
      console.log('error in deleting from database');
      return ;
    }
   return res.redirect('back');
});

  // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
   
  // if(contactIndex != -1){
  //   contactList.splice(contactIndex ,1 );
  // }

  // return res.redirect('back');


});

app.listen(port,function(err){
    if(err){
        console.log('error in running the server',err);
                            
    }                            
    console.log('Yup!My express server is running on port',port);
});

