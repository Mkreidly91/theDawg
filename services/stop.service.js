const { getAudioManager, resetState } = require("../database");
const { destroyConnection } = require("../Helpers/voice.helpers");

const stopService = (message) => {
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

  audioPlayer.stop();
  destroyConnection(audioManager);
  resetState(guildId);

  return { error: "" };
};

module.exports = stopService;
