const { getAudioManager } = require("../database");
const { seekArgsError } = require("../Errors/voiceErrors");
const { seekInterval } = require("../voice");

const seekService = ({ message, args }) => {
  const { guildId } = message;
  const audioManager = getAudioManager(guildId);

  const { currentSong } = audioManager;
  const error = seekArgsError(args, currentSong);
  if (error) {
    return { error };
  }
  seekInterval(args, getAudioManager(guildId));
  return { error };
};

module.exports = seekService;
