const { getOrCreate, getAudioManager } = require("../database");
const { playYt, joinVoice, addToQ } = require("../Helpers/voice.helpers");

const playService = async ({ message, args, song }) => {
  const {
    member: {
      voice: {
        id: channelId,
        guild: { id: guildId },
      },
    },
  } = message;

  try {
    const { addedResponse, error } = await addToQ({
      args,
      audioManager: getAudioManager(guildId),
      song,
    });
    if (error) {
      return { error: `Oops,something went wrong, try -search ${args}` };
    }
    const audioManager = joinVoice({
      message,
      audioManager: getOrCreate(guildId),
    });
    playYt(getAudioManager(guildId));

    return { addedResponse };
  } catch (e) {
    console.log(e);
  }
};
module.exports = playService;
