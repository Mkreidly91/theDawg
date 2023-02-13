const { getAudioManager } = require("../database");
const { radio } = require("../Helpers/voice.helpers");

const radioService = async (message) => {
  const { guildId } = message;
  const audioManager = getAudioManager(guildId);
  const { audioPlayer } = audioManager;
  if (!audioPlayer) {
    return { error: "No audio player connected" };
  }
  const addedResponse = await radio(audioManager);
  console.log(addedResponse);
  return { addedResponse };
};

module.exports = radioService;
