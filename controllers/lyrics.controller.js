const theDawgError = require("../Errors/theDawgError");
const { lyricsService } = require("../services");

const lyricsController = async ({ message, args }) => {
  const { channel } = message;
  const { response, error } = await lyricsService({ message, args });

  if (error) {
    new theDawgError(channel, error).send();
    return;
  }
  const { fullTitle, lyrics } = response;
  if (lyrics) {
    if (Array.isArray(lyrics)) {
      await channel.send(`${fullTitle}:\n\n`);
      for (const section of lyrics) {
        await channel.send(section);
      }
      return;
    }
    await channel.send(`${fullTitle}:\n\n${lyrics}`);
  } else {
    await channel.send(response);
  }
};

module.exports = lyricsController;
