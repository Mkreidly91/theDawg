const { bold } = require("discord.js");
const { getAudioManager } = require("../database");
const geniusClient = require("../Genius");

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

    const bestResult = searchResults.find((song) => {
      const {
        title,
        fullTitle,
        artist: { name },
      } = song;
      const titleRegx = new RegExp(songTitle.toLowerCase());
      const artistRegx = new RegExp(by.split(" ")[0].toLowerCase());

      if (
        title.toLowerCase().match(titleRegx) ||
        name.toLowerCase().match(artistRegx)
      ) {
        return song;
      } else if (
        title.toLowerCase().includes(songTitle.toLowerCase()) ||
        name.toLowerCase().includes(by.split(" ")[0].toLowerCase())
      ) {
        return song;
      }
    });

    if (!searchResults || !bestResult) {
      return { response: "no results found" };
    }

    if (bestResult?.instrumental) {
      const { fullTitle } = bestResult;
      return { response: `${fullTitle} is an instrumental` };
    }

    try {
      const { fullTitle } = bestResult;
      const lyrics = await bestResult.lyrics();
      return { response: `${bold(fullTitle)}:\n\n\n${lyrics}` };
    } catch (error) {
      return { error: "No result was found" };
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = lyricsService;
