class theDawgError {
  constructor(channel, msg) {
    this.channel = channel;
    this.msg = msg;
  }

  send() {
    this.channel.send(`theDawgError: ${this.msg}`);
  }
}

module.exports = theDawgError;
