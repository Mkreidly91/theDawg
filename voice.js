const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  generateDependencyReport,
  AudioPlayerStatus,
  NoSubscriberBehavior,
  getVoiceConnection,
} = require("@discordjs/voice");

const fs = require("fs");
const ytdl = require("ytdl-core");

const connectionObject = {
  audioPlayer: "",
};

const joinVoice = async ({ channel, channelId, guildId }, url) => {
  try {
    const prevConnection = getVoiceConnection(guildId);
    console.log(prevConnection);

    const connection = joinVoiceChannel({
      channelId: channelId,
      guildId: guildId,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: false,
    });

    connection.joinConfig = { ...connection.joinConfig, selfDeaf: false };

    const audioPlayer = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
      },
    });

    connectionObject.audioPlayer = audioPlayer;

    const videoInfo = await ytdl.getInfo(url);

    const video = ytdl(videoInfo.videoDetails.video_url, {
      filter: "audioonly",
    });

    const resource = createAudioResource(video, {
      inlineVolume: true,
    });

    resource.volume.setVolume(0.5);

    const subscription = connection.subscribe(audioPlayer);

    audioPlayer.play(resource);

    audioPlayer.on(AudioPlayerStatus.Idle, () => {
      setTimeout(() => {
        connection.destroy();
        audioPlayer.removeAllListeners();
      }, 5000);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { joinVoice, connectionObject };
