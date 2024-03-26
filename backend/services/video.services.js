const {Video}=require("../models");
const httpStatus = require("http-status");


const searchAllVideos=async(title,genre,sort,contentRating)=>{
    // console.log(title,sort,genres,contentRating);
    // console.log(contentRating)
    try {
        let genreList = ["All"];
        const contentRatingLists = ["Anyone", "7+", "12+", "16+", "18+"];
        const AllGenreLists = ["Education", "Sports", "Movies", "Comedy", "Lifestyle", "All"];
        // if we want  to wriiten all videos 

        if (!title && !genre && !sort && !contentRating){
            const result=await Video.find({})
            // console.log(result)
            return result
        }

        // if only title is  passed 
        if (title && !genre && !sort && !contentRating) {
            const result = await Video.find({ 
                "title": { 
                    $regex: new RegExp(title, "i") 
                } 
            });
            return result ;
        } 


    //   if only genre is passed
        if (genre) {
            genreList = genre.toString().split(",");
        
            const ifGenreNotInList = genreList.some(item => AllGenreLists.includes(item));

            // if none of the genre item matches
            if (!ifGenreNotInList) {
                throw new ApiError(httpStatus.BAD_REQUEST, `genre must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]`);
            }
             // if all parameters are passed except sortBy
             if (title && contentRating && genre) {
                const allVideos = await Video.find({
                    $and: [
                        {
                            "title": { 
                                $regex: new RegExp(title, "i") 
                            }
                        },
                        {
                            "genre": { 
                                $in: genreList 
                            } 
                        },
                        {
                            "contentRating": contentRating
                        }
                    ]
                });
                
                return allVideos;
                
        
            }
            // if title and genres are passed or only if genre is passsed(filters in both cases) 
            const allVideos = await Video.find({
                $and: [
                    {
                        "title": { 
                            $regex: new RegExp(title, "i") 
                        }
                    },
                    {
                        "genre": { 
                            $in: genreList 
                        } 
                    }
                ]
            });
    
            return allVideos;
        }

         // if title and genres are passed or only if genre is passsed(filters in both cases) 
        
        if (sort) {
            const videos = await Video.find({});
            if (sort === "viewCount") {
                const sortedVideos = [...videos].sort((a,b) => b.viewCount - a.viewCount);
                return sortedVideos;
            } else if (sort === "releaseDate") {
                const sortedVideos = [...videos].sort((a,b) => new Date(b.releaseDate) - new Date(a.releaseDate));
                return sortedVideos;
            } else {
                throw new ApiError(httpStatus.NOT_FOUND, "sort By must be one of [viewCount, releaseDate]");
            }
        }

        // if only contentRating is passed
        if (contentRating && !title && !sort && !genre) {
              
            let indexOfContentRating = contentRatingLists.indexOf(contentRating);
            
            if (indexOfContentRating < 0) {
                throw new ApiError(httpStatus.NOT_FOUND, "contentRating must be one of [Anyone, 7+, 12+, 16+, 18+, All]");
            }
            const possibleContentRating = contentRatingLists.slice(indexOfContentRating); // Use slice instead of splice
         const videos = await Video.find({ "contentRating": { $in: possibleContentRating } })
            // const videos  = await Video.find({ "contentRating" : possibleContentRating });
            //   console.log(videos)
            return videos;
        }






    }
    catch(err){
        console.log(err)
        // throw err
    }
}
const searchbyId=async(id)=>{
    try{
        // console.log(id)
        const video= Video.findById(id)
        // console.log(video)

         if (video){
            return video 
         } else {
            throw new ApiError(httpStatus.NOT_FOUND, "Video not found");
         }

    }catch(err) {
        throw err 
        // console.log(err)

    }





}

const postNewVideo= async(body)=>{
    try{
    //  console.log(body)
        if (body.length > 1) {
            const video = await Video.insertMany(body);
            return video;
        } else {
            const {videoLink, title, genre, contentRating, releaseDate, previewImage } = body;
   
            if (videoLink && title && genre && contentRating && releaseDate && previewImage) {
                const newVideo = await Video.create(body);
                await newVideo.save();
                return newVideo;
            } else {
                throw new ApiError(httpStatus.BAD_REQUEST, "a body parameter is missing");
            }
        }

    }catch(err){
        throw err
    }
}

const modifyvoteCount=async(req)=>{
    try {
        const { vote, change } = req.body;
        const { videoId } = req.params;

        const video = await Video.findById(videoId);

        if (vote === "upVote" && change === "increase") {

            video.votes.upVotes += 1; 

        } else if (vote === "upVote" && change === "decrease") {
            if (video.votes.upVotes > 0) {

                video.votes.upVotes -= 1;
            } else {

                video.votes.upVotes = 0;
            }
        } else if (vote === "downVote" && change === "increase") {

            video.votes.downVotes += 1;

        } else if (vote === "downVote" && change === "decrease") {
            if (video.votes.downVotes > 0) {

                video.votes.downVotes -= 1;
            } else {

                video.votes.downVotes = 0;
            }
        }

        await video.save();
        return video;

    } catch (err) {
        // console.log(err)
        throw err;
    }

}
const modifyviewCount = async (id) => {
    try {
        // console.log(id)
        const video = await Video.findById(id);
        // console.log(video)
        video.viewCount +=1;
        await video.save();

        return video;

    } catch (err) {
        console.log(err)
        // throw err;
    }
}
 

module.exports={
    searchAllVideos,
    searchbyId,
    postNewVideo,
    modifyvoteCount,
    modifyviewCount

}