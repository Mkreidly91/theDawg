const { getOrCreate, getAudioManager } = require("../database");
const { playYt, joinVoice, addToQ } = require("../Helpers/voice.helpers");

const playService = async ({ message, args }) => {
  const {
    member: {
      voice: {
        id: channelId,
        guild: { id: guildId },
      },
    },
  } = message;

  try {
    const audioManager = joinVoice({
      message,
      audioManager: getOrCreate({ guildId, channelId }),
    });

    const addedResponse = await addToQ({
      args,
      audioManager: getAudioManager({ guildId, channelId }),
    });

    playYt(getAudioManager({ guildId, channelId }));
    console.log(addedResponse);
    return { addedResponse };
  } catch (e) {
    console.log(e);
  }
};
module.exports = playService;
