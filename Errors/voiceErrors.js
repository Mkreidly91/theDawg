const theDawgError = require('./theDawgError');
const { yt_validate, playlist_info } = require('play-dl');

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
    new theDawgError(textChannel, 'No audio player connected').send();
    return true;
  }
  return false;
};

const playArgsError = async ({ textChannel, args }) => {
  const url = args.trim();

  const urlValidation = () => {
    try {
      const result = yt_validate(url);
      return result;
    } catch (error) {
      return false;
    }
  };

  if (!url) {
    new theDawgError(
      textChannel,
      `Please provide an argument: "-play {{search or url}}"`
    ).send();
    return true;
  }

  switch (urlValidation()) {
    case false:
      new theDawgError(textChannel, `Please provide a valid URL`).send();
      return true;

    case 'playlist':
      try {
        await playlist_info(url);
      } catch (error) {
        new theDawgError(
          textChannel,
          `The playlist does not exist. Please provide a valid URL`
        ).send();
        return true;
      }
    default:
      return false;
  }
};

const searchArgsError = ({ textChannel, args }) => {
  if (!args.trim()) {
    new theDawgError(
      textChannel,
      `Please provide an argument: "-search {{song}}"`
    ).send();
    return true;
  } else if (yt_validate(args.trim()) !== 'search') {
    new theDawgError(
      textChannel,
      'Search does not take url as an argument.'
    ).send();
    return true;
  }
  return false;
};
const seekArgsError = ({ args, audioManager }) => {
  let error = '';

  const { currentSong } = audioManager;
  const { duration } = currentSong;
  if (!currentSong) {
    error = 'Nothing to seek brudda';
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
  searchArgsError,
};
