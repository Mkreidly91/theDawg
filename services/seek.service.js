const { getAudioManager } = require("../database");
const { seekArgsError } = require("../Errors/voiceErrors");
const { seekInterval } = require("../Helpers/voice.helpers");

const seekService = ({ message, args }) => {
  const { guildId } = message;
  const { currentSong } = getAudioManager(guildId);
  if (!currentSong) {
    return { error: "No song is currently playing" };
  }
  const error = seekArgsError({ args, audioManager: getAudioManager(guildId) });
  if (error) {
    return { error };
  }
  seekInterval({ args, audioManager: getAudioManager(guildId) });
  return { error };
};

module.exports = seekService;
