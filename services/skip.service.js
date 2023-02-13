const { getAudioManager } = require("../database");

const skipService = (message) => {
  const { guildId } = message;
  const audioManager = getAudioManager(guildId);
  const { audioPlayer } = audioManager;
  if (!audioPlayer) {
    return { error: "No audio player connected" };
  }
  audioPlayer.stop();
  return { error: "" };
};

module.exports = skipService;
