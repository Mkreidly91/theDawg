const { getAudioManager, getGuild, guildCollection } = require("../database");

const pauseService = (message) => {
  const {
    member: {
      voice: { channel: voiceChannel },
    },
    guild: { id: guildId },
  } = message;

  const { id: channelId } = voiceChannel;

  const audioManager = getAudioManager({ guildId, channelId });
  const audioManagers = guildCollection.get(guildId).audioManager;
  Object.keys(audioManagers).forEach((key) =>
    console.log({ key: audioManager[key] })
  );
  const { audioPlayer } = audioManager;

  if (!audioPlayer) {
    const error = "No audio player connected";
    return { error };
  }
  audioPlayer.pause();
};

module.exports = pauseService;
