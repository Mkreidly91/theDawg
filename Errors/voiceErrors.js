const theDawgError = require("./theDawgError");

const voiceConnectionError = (message) => {
  const { member, channel: textChannel } = message;
  const voiceChannel = member.voice.channel;

  if (!voiceChannel) {
    new theDawgError(
      textChannel,
      `${member.user.username} is not connected to voice`
    ).send();
    return true;
  }
  return false;
};

const audioPlayerError = ({ textChannel, audioPlayer }) => {
  if (!audioPlayer) {
    new theDawgError(textChannel, "No audio player connected").send();
    return true;
  }
  return false;
};

const playArgsError = ({ textChannel, args }) => {
  if (!args.trim()) {
    new theDawgError(
      textChannel,
      `Please provide an argument: "-play {{search or url}}"`
    ).send();
    return true;
  }
  return false;
};

const seekArgsError = ({ args, audioManager }) => {
  let error = "";

  const { currentSong } = audioManager;
  const { duration } = currentSong;
  if (!currentSong) {
    error = "Nothing to seek brudda";
  }
  if (args < 0) {
    error = `Input must be a positive number`;
  } else if (args > duration) {
    error = `please provide input between 0 - ${duration} seconds`;
  }
  return error;
};

module.exports = {
  voiceConnectionError,
  playArgsError,
  seekArgsError,
  audioPlayerError,
};
