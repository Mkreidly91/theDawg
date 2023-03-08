const { errorMessageEmbed } = require("../Helpers/embeds.helpers");

class theDawgError {
  constructor(channel, msg) {
    this.channel = channel;
    this.msg = msg;
  }

  async send() {
    await this.channel.send({
      embeds: [errorMessageEmbed(`theDawgError: ${this.msg}`)],
    });
  }
}

module.exports = theDawgError;
