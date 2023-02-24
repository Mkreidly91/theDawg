const { bold } = require("discord.js");
const { getAudioManager } = require("../database");
const geniusClient = require("../Genius");
const { getBestLyrics } = require("../Helpers/search.helpers");
const { searchSong } = require("../Helpers/voice.helpers");

const lyricsService = async ({ message, args }) => {
  try {
    const { guildId, channel } = message;
    const audioManager = getAudioManager(guildId);
    const { audioPlayer, currentSong } = audioManager;
    let targetSong;
    if (!args) {
      if (!audioPlayer) {
        return { error: "No audio player connected" };
      }

      if (!currentSong) {
        return { error: "No song currently playing" };
      }

      targetSong = currentSong;
    } else {
      const { info, type } = await searchSong(args);
      if (type === "playlist") {
        return { error: "Invalid Argument: cannot search for playlists" };
      } else {
        const { title, channel, url, durationInSec } = info.video_details;

        targetSong = {
          title,
          by: channel.name,
          url,
          relatedVideos: info.related_videos,
          duration: durationInSec,
        };
      }
    }

    const { title: songTitle, by } = targetSong;
    const searchResults = await geniusClient.songs.search(songTitle);
    if (!searchResults[0]) {
      return { response: "No results found" };
    }
    return { response: searchResults };
  } catch (error) {
    console.log(error);
  }
};

module.exports = lyricsService;
