const { bold } = require("discord.js");
const { getAudioManager } = require("../database");
const geniusClient = require("../Genius");
const { getBestLyrics } = require("../Helpers/search.helpers");

const lyricsService = async (message) => {
  try {
    const { guildId } = message;
    const audioManager = getAudioManager(guildId);
    const { audioPlayer, currentSong } = audioManager;

    if (!audioPlayer) {
      return { error: "No audio player connected" };
    }

    const { title: songTitle, by } = currentSong;
    const searchResults = await geniusClient.songs.search(songTitle);

    const bestResult = getBestLyrics(searchResults, currentSong);

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
        let lyricsArr = [];
        let start = 0;
        let end = 2000;
        while (end < lyrics.length - 1) {
          console.log(start, end);
          const substr = lyrics.substring(start, end);
          lyricsArr.push(substr);
          start = end;
          end =
            end + 2000 > lyrics.length ? lyrics.length - 1 - end : end + 2000;
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
