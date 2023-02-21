const { bold } = require("discord.js");
const { getAudioManager } = require("../database");
const geniusClient = require("../Genius");
const { getBestLyrics } = require("../Helpers/search.helpers");
const { searchSong } = require("../Helpers/voice.helpers");

const lyricsService = async ({ message, args }) => {
  try {
    const { guildId } = message;
    const audioManager = getAudioManager(guildId);
    const { audioPlayer, currentSong } = audioManager;
    let targetSong;
    if (!args) {
      if (!audioPlayer) {
        return { error: "No audio player connected" };
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
    console.log(targetSong);
    const { title: songTitle, by } = targetSong;
    const searchResults = await geniusClient.songs.search(songTitle);

    const bestResult = getBestLyrics(searchResults, targetSong);

    if (!searchResults[0] || !bestResult) {
      return { response: "no results found" };
    }

    if (bestResult?.instrumental) {
      const { fullTitle } = bestResult;
      return { response: `${fullTitle} is an instrumental` };
    }

    try {
      const { fullTitle } = bestResult;
      const lyrics = await bestResult.lyrics();
      if (lyrics.length > 2000) {
        console.log(lyrics.length);
        let lyricsArr = [];

        for (let i = 0; i < lyrics.length; i += 2000) {
          lyricsArr.push(lyrics.substring(i, i + 2000));
        }
        return { response: { fullTitle: bold(fullTitle), lyrics: lyricsArr } };
      }
      return { response: { fullTitle: bold(fullTitle), lyrics } };
    } catch (error) {
      return { error: "No result was found" };
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = lyricsService;
