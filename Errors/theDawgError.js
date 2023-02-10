class theDawgError {
  constructor(channel, msg) {
    this.channel = channel;
    this.msg = msg;
  }

  async send() {
    await this.channel.send(`theDawgError: ${this.msg}`);
  }
}

module.exports = theDawgError;
