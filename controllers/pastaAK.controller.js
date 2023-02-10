const theDawgError = require("../Errors/theDawgError");

const pastaAKController = async ({ message, args }) => {
  args = parseInt(args);
  const intervalId = setInterval(() => {
    message.channel.send(
      "W mostafa ma mgalle since ever w mazhar ma mgalle min shahren w ahmad ma mgalle since ever so idk leh kebseene 2ele ta gale more than 1 so dabrowanya ghezlan"
    );
  }, 1000);
  setTimeout(() => {
    clearInterval(intervalId);
  }, args * 1000 + 1000);
};

module.exports = pastaAKController;
