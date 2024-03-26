const express=require ("express");
// const httpStatus = require("http-status");
const app=express();
// const app=require()


app.use(express.json());
const router = express.Router();
require('dotenv').config()
const config = require("./config/config");
// const routes=require("./routes/video.route")
// const videoController=require("./controllers/route.controller")


const videoRoute=require("./routes/index")
app.use(express.urlencoded({ extended: true}));

// now we are using express for getting response 
app.use("/v1",videoRoute)

// app.listen(config.port,()=>{
//     console.log(`Listening",${config.port}`)
// })
module.exports = app;