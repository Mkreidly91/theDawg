const { getAudioManager } = require('../database');
const geniusClient = require('../Genius');

const lyricsService = async ({ message, args }) => {
  const { guildId } = message;
  const audioManager = getAudioManager(guildId);
  const { audioPlayer, currentSong } = audioManager;

  if (!args) {
    if (!audioPlayer) {
      return { error: 'No audio player connected' };
    }

    if (!currentSong) {
      return { error: 'No song currently playing' };
    }
  }

  const searchResults = await geniusClient.songs.search(
    args ? args : currentSong.title
  );

  if (!searchResults[0]) {
    return { error: 'No results found' };
  }
  return { response: searchResults };
};

module.exports = lyricsService;
