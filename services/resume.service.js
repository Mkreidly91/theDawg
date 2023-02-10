const { getAudioManager } = require("../database");

const resumeService = (message) => {
  const {
    member: {
      voice: { channel: voiceChannel },
    },
    guild: { id: guildId },
  } = message;

  const audioManager = getAudioManager(guildId);
  const { audioPlayer } = audioManager;

  if (!audioPlayer) {
    return { error: "No audio player connected" };
  }

  audioPlayer.unpause();
  return { error: "" };
};

module.exports = resumeService;
