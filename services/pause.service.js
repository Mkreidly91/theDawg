const { getAudioManager, getGuild, guildCollection } = require("../database");

const pauseService = (message) => {
  const {
    member: {
      voice: { channel: voiceChannel },
    },
    guild: { id: guildId },
  } = message;

  const { id: channelId } = voiceChannel;

  const audioManager = getAudioManager(guildId);
  const { audioPlayer } = audioManager;

  if (!audioPlayer) {
    return { error: "No audio player connected" };
  }

  audioPlayer.pause();
  return { response: "Playback paused." };
};

module.exports = pauseService;
