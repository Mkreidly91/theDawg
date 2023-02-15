const theDawgError = require("../Errors/theDawgError");
const { lyricsService } = require("../services");

const lyricsController = async (message) => {
  const { channel } = message;
  const { response, error } = await lyricsService(message);

  if (error) {
    new theDawgError(channel, error).send();
    return;
  }
  await channel.send(response);
};

module.exports = lyricsController;
