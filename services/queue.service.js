const { getAudioManager } = require("../database");
const { showQ } = require("../Helpers/voice.helpers");

const queueService = async (message) => {
  const { guildId } = message;
  const audioManager = getAudioManager(guildId);
  const { audioPlayer } = audioManager;
  if (!audioPlayer) {
    return { error: "No audio player connected" };
  }
  const response = showQ(getAudioManager(guildId));
  return { response };
};

module.exports = queueService;
