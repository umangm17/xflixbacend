const mongoose=require("mongoose")


const VideoSchema=new mongoose.Schema(
    {
    id:{
        type:String
    },
    videoLink:{ 
    type: String,
    required: true,
    trim: true,
    } ,
 title:{type:String,
   required:true
},
genre:{
    type: String,
    required: true
},
contentRating:{
    type: String,
            required: true,
            trim: true
},

releaseDate:{
    type: Date,
    default: Date.now()
},
previewImage:{
    type: String,
    required: true,
    trim: true
},
votes: {
    upVotes: {
        type: Number,
        default: 0
    },
    downVotes: {
        type: Number,
        default: 0
    }
},
viewCount: {
    type: Number,
    default: 0
}



},
{
    timestamps: false
})

const Video=mongoose.model("Video",VideoSchema);
module.exports={Video};