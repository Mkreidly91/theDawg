const { searchSong } = require("../Helpers/voice.helpers");

const searchService = async ({ message, args }) => {
  try {
    const { info } = await searchSong(args, true);
    let songs = [];

    info.forEach((promise) => {
      if (promise.status === "rejected") return;
      const {
        value: { video_details },
      } = promise;
      const { title, channel, url, durationInSec, id } = video_details;
      songs.push({
        title,
        by: channel.name,
        url,
        relatedVideos: promise.value.related_videos,
        duration: durationInSec,
        id,
      });
    });

    return { response: songs };
  } catch (error) {
    console.log(error);
    // return { error };
  }
};

module.exports = searchService;
