const { searchSong } = require('../Helpers/voice.helpers');

const searchService = async (args) => {
  const { info } = await searchSong(args, true);
  let songs = [];

  info.forEach((promise) => {
    if (promise.status === 'rejected') return;
    const {
      value: { video_details },
    } = promise;
    const { title, channel, url, durationInSec, durationRaw, id } =
      video_details;
    songs.push({
      title,
      by: channel.name,
      url,
      relatedVideos: promise.value.related_videos,
      duration: durationInSec,
      durationRaw,
      id,
    });
  });

  return { response: songs };
};

module.exports = searchService;
