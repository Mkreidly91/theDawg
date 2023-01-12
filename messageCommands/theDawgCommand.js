class theDawgCommand {
  constructor() {}
  name;
  action;

  setName(text) {
    this.name = text;
    return this;
  }
  setAction(func) {
    this.action = func;
    return this;
  }
  execute(message) {
    this.action(message);
  }
}

module.exports = theDawgCommand;
