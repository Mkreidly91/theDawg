const theDawgCommand = require("./theDawgCommand");
const theDawgError = require("../Errors/theDawgError");
const { joinVoice, connectionObject } = require("../voice");

const topg = new theDawgCommand().setName("topG").setAction((message) => {
  const { member, channel } = message;
  const voiceChannel = member.voice.channel;
  const channelId = voiceChannel.id;
  const guildId = voiceChannel.guild.id;
  if (!voiceChannel) {
    new theDawgError(
      channel,
      `${member.user.username} is not connected to voice`
    );
  }
  joinVoice(
    { channel: voiceChannel, channelId, guildId },
    "/Users/mostafa/Desktop/Discord-Bot/Resources/topG.mp3"
  );
});

const kreiks = new theDawgCommand().setName("kreiks").setAction((message) => {
  const { member, channel } = message;
  const voiceChannel = member.voice.channel;

  const channelId = voiceChannel.id;
  const guildId = voiceChannel.guild.id;
  if (!voiceChannel) {
    new theDawgError(
      channel,
      `${member.user.username} is not connected to voice`
    );
  }
  joinVoice(
    { channel: voiceChannel, channelId, guildId },
    "/Users/mostafa/Desktop/Discord-Bot/Resources/kreiks.mp3"
  );
});

const play = new theDawgCommand().setName("play").setAction(async (message) => {
  const args = message.content.split(" ")[1];

  const { member, channel } = message;
  const voiceChannel = member.voice.channel;

  if (!voiceChannel) {
    new theDawgError(
      channel,
      `${member.user.username} is not connected to voice`
    );
    return;
  }

  const channelId = voiceChannel.id;
  const guildId = voiceChannel.guild.id;
  await joinVoice({ channel: voiceChannel, channelId, guildId }, args);
});

const pause = new theDawgCommand().setName("pause").setAction((message) => {
  const { member, channel } = message;
  const voiceChannel = member.voice.channel;
  if (!voiceChannel) {
    new theDawgError(
      channel,
      `${member.user.username} is not connected to voice`
    );
  }
  connectionObject.audioPlayer.pause();
});

const resume = new theDawgCommand().setName("resume").setAction((message) => {
  const { member, channel } = message;
  const voiceChannel = member.voice.channel;
  if (!voiceChannel) {
    new theDawgError(
      channel,
      `${member.user.username} is not connected to voice`
    );
  }
  connectionObject.audioPlayer.unpause();
});

module.exports = { topg, kreiks, play, pause, resume };
