const { getOrCreate, getAudioManager } = require('../database');
const { playYt, joinVoice, addToQ } = require('../Helpers/voice.helpers');

const playService = async ({ message, args, song }) => {
  const { guildId } = message;

  const { addedResponse, error } = await addToQ({
    args,
    audioManager: getAudioManager(guildId),
    song,
  });
  if (error) {
    return { error };
  }

  const audioManager = joinVoice({
    message,
    audioManager: getOrCreate(guildId),
  });

  playYt(audioManager);

  return { addedResponse };
};
module.exports = playService;
