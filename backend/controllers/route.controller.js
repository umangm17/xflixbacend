const httpStatus = require("http-status");
// const ApiError = require("../utils/Apierror");
const catchAsync = require("../utils/catchAsync");
const videoService = require("../services/video.services");

const getAllVideos = catchAsync(async (req, res) => {
  try {
    // console.log(req.query)
    const { title, genres, sortBy, contentRating } = req.query;
    
    const videos = await videoService.searchAllVideos(
      title,
      genres,
      sortBy,
      contentRating
    );
    //  console.log(videos)
    if (videos) {
      res.status(httpStatus.OK).send({ videos: videos });
    }
  } catch (err) {
    res
      .status(httpStatus.NOT_FOUND)
      .send({ statusCode: httpStatus.NOT_FOUND, message: "Videos not found" });
  }
});
const getVideobyId = catchAsync(async (req, res) => {
  try {
    const id = req.params.videoId;
  const video = await videoService.searchbyId(id);
    if (video) {
      res.status(httpStatus.OK).send(video);
    }
  } catch (err) {
    res.send({ statusCode: httpStatus.NOT_FOUND, message: "Video not found" });
  }
});

const postVideo = catchAsync(async (req, res) => {
  try {
    // console.log(req.body)
    const newpostVideo = await videoService.postNewVideo(req.body);
    if (newpostVideo) {
      res.status(httpStatus.CREATED).send(newpostVideo);
    }
  } catch (err) {
    console.log(err)
    res.send({statusCode: httpStatus.BAD_REQUEST, message: "Video not created"});
  }
});

const updateVoteCount = catchAsync(async (req,res) => {
  // console.log(req.body)
  try {
    const videos = await videoService.modifyvoteCount(req);
    if (videos) {
      res.status(httpStatus.CREATED).send(videos);
    }
  } catch (err) {
    res.send({
      statusCode: httpStatus.BAD_REQUEST,
      message: "Some parameter is missing or id is invalid",
    });
  }
});
const updateViewCount = catchAsync(async (req,res) => {
  try {
    // console.log(req.params.videoId)
    const { videoId } = req.params;
    const videos = await videoService.modifyviewCount(videoId);
    if (videos) {
        res.status(httpStatus.CREATED).send(videos);
    }

  } catch (err) {
    res.send({statusCode: httpStatus.BAD_REQUEST, message: "video Id must be valid Id"});
  }
});

module.exports = {
  getAllVideos,
  getVideobyId,
  postVideo,
  updateVoteCount,
  updateViewCount,
};
