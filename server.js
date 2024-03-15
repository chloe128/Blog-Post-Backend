//import necessary modules or dependencies
const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config();

//make an instance of express app
const app=express();

//middleware
app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    if(req.body){
        console.log('Request body:');
        console.log(req.body);
    }
    next();
})

//routes
app.use('/api/posts/',require('./src/routes/post'));
app.use("/api/users",require("./src/routes/user"));
//connect to mongodb
mongoose
    .connect(process.env.MONGODB_URI,{useNewUrlParser: true,useUnifiedTopology: true})
    .then(()=>{
        console.log('Connected to MongoDB.');
    }).catch((error)=>{
        console.log('error in connecting to MongoDB',error.message);
    })

//start the server
const port =process.env.PORT ||4000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});