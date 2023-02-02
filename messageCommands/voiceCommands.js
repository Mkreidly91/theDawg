const theDawgCommand = require("./theDawgCommand");
const theDawgError = require("../Errors/theDawgError");
const {
  voiceConnectionError,
  playArgsError,
} = require("../Errors/voiceErrors");

const {
  joinVoice,
  connectionObject,
  playYt,
  playCustom,
  pauseSong,
  resumeSong,
  skipSong,
  stopMusic,
  searchSong,
  seekInterval,
} = require("../voice");

const topg = new theDawgCommand().setName("topG").setAction(async (message) => {
  const { member, channel: textChannel } = message;
  const voiceChannel = member.voice.channel;
  const channelId = voiceChannel.id;
  const guildId = voiceChannel.guild.id;
  if (!connectionObject.textChannel) {
    connectionObject.textChannel = message.channel;
  }
  if (voiceConnectionError(message)) return;

  joinVoice({ textChannel, voiceChannel });
  playCustom("/Users/mostafa/Desktop/Discord-Bot/Resources/topG.mp3");
});

const kreiks = new theDawgCommand()
  .setName("kreiks")
  .setAction(async (message) => {
    const { member, channel: textChannel } = message;
    const voiceChannel = member.voice.channel;

    if (!connectionObject.textChannel) {
      connectionObject.textChannel = message.channel;
    }
    if (voiceConnectionError(message)) return;

    joinVoice({ textChannel, voiceChannel });
    playCustom("/Users/mostafa/Desktop/Discord-Bot/Resources/Kreiks.mp3");
  });

const play = new theDawgCommand().setName("play").setAction(async (message) => {
  // const args = message.content.split(" ")[1];
  const content = message.content.split(" ");
  content.shift();
  const args = content.join(" ");

  const { member, channel: textChannel } = message;
  const voiceChannel = member.voice.channel;

  if (!connectionObject.textChannel) {
    connectionObject.textChannel = message.channel;
  }

  if (voiceConnectionError(message)) return;
  if (playArgsError({ textChannel, args })) return;

  joinVoice({ textChannel, voiceChannel });
  playYt(args);
});

const pause = new theDawgCommand()
  .setName("pause")
  .setAction(async (message) => {
    if (!connectionObject.textChannel) {
      connectionObject.textChannel = message.channel;
    }
    if (voiceConnectionError(message)) return;
    pauseSong();
  });

const resume = new theDawgCommand()
  .setName("resume")
  .setAction(async (message) => {
    if (!connectionObject.textChannel) {
      connectionObject.textChannel = message.channel;
    }
    if (voiceConnectionError(message)) return;
    resumeSong();
  });

const skip = new theDawgCommand().setName("skip").setAction(async (message) => {
  if (!connectionObject.textChannel) {
    connectionObject.textChannel = message.channel;
  }
  if (voiceConnectionError(message)) return;
  skipSong();
});

const stop = new theDawgCommand().setName("stop").setAction(async (message) => {
  if (!connectionObject.textChannel) {
    connectionObject.textChannel = message.channel;
  }
  if (voiceConnectionError(message)) return;
  stopMusic();
});

const search = new theDawgCommand()
  .setName("search")
  .setAction(async (message) => {
    const content = message.content.split(" ");
    content.shift();
    const args = content.join(" ");

    const { member, channel: textChannel } = message;
    if (!connectionObject.textChannel) {
      connectionObject.textChannel = message.channel;
    }
    if (voiceConnectionError(message)) return;
    searchSong(args, textChannel);
  });

// seek
const seek = new theDawgCommand().setName("seek").setAction(async (message) => {
  if (!connectionObject.textChannel) {
    connectionObject.textChannel = message.channel;
  }
  const args = message.content.split(" ")[1];
  if (voiceConnectionError(message)) return;
  seekInterval(args);
});

module.exports = {
  topg,
  kreiks,
  play,
  pause,
  resume,
  skip,
  stop,
  search,
  seek,
};
