const deafen = require("./deafen.route");
const khallisne = require("./khallisne.route");
const mute = require("./mute.route");
const nuke = require("./nuke.route");
const pastaAK = require("./pastaAK.route");
const pause = require("./pause.route");
const play = require("./play.route");
const resume = require("./resume.route");
const stop = require("./stop.route");
const undeafen = require("./undeafen.route");
const unmute = require("./unmute.route");

module.exports = {
  mute,
  unmute,
  deafen,
  undeafen,
  nuke,
  khallisne,
  pastaAK,
  play,
  pause,
  resume,
  stop,
};
