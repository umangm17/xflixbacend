
// const http=require("http");
// const server =http.createServer()
const mongoose = require('mongoose');
const config = require("./config/config");
const MONGODB_URL=process.env.MONGODB_URL
// const PORT=process.env.PORT
const PORT=8082;

const app=require("./app")
// const express=require ("express");
// const app=express();
// const router = express.Router();
// // const routes=require("./routes/video.route")
// const videoController=require("./controllers/route.controller")
// const PORT=8082;





// NOW WE ARE USING HTTP SERVER FOR CREATING SERVER 
// 1) here we use response to send from http server 
// const server =http.createServer((req,res)=>{
//     console.log("hello from server ")
//     res.end()

// })
// server.listen(PORT,()=>{
//     console.log("listening", PORT)
// })



// HERE BELOW WE ARE USING EXPREES INSTEAD OF HTTP SERVER 


// NOW WE CONNECT DB TO NODE JS 
const startMongo = async () => {
    try {
      await mongoose.connect(MONGODB_URL)
           .then(() => console.log("connected to mongo DB"))
           .catch(err => console.log(err));
  
      app.listen(PORT, () => {
        console.log("app listening on port" + PORT)
      });
    } catch (err) {
      throw err;
    }
  }
  
  startMongo();

