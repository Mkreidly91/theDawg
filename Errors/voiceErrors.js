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

const seekArgsError = ({ textChannel, args, currentSong }) => {
  let error = "";
  if (!currentSong) {
    new theDawgError(textChannel, "Nothing to seek brudda").send();
    return true;
  }
  const { duration } = currentSong;

  if (!args) {
    error = `Please provide an argument: "-seek {{number}}"`;
  }

  const num = parseInt(args);

  if (isNaN(num)) {
    error = `Please provide a number`;
  } else if (num < 0) {
    error = `Input must be a positive number`;
  } else if (num > duration) {
    error = `please provide input between 0 - ${duration} seconds`;
  }
  if (!error) return false;
  new theDawgError(textChannel, error).send();
  return true;
};

module.exports = {
  voiceConnectionError,
  playArgsError,
  seekArgsError,
  audioPlayerError,
};
