const deafen = require("./deafen.route");
const khallisne = require("./khallisne.route");
const kreiks = require("./kreiks.route");
const lyrics = require("./lyrics.route");
const mute = require("./mute.route");
const nuke = require("./nuke.route");
const pastaAK = require("./pastaAK.route");
const pause = require("./pause.route");
const play = require("./play.route");
const queue = require("./queue.route");
const radio = require("./radio.route");
const resume = require("./resume.route");
const search = require("./search.route");
const seek = require("./seek.route");
const skip = require("./skip.route");
const stop = require("./stop.route");
const topG = require("./topG.route");
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
  skip,
  seek,
  radio,
  queue,
  lyrics,
  search,
  kreiks,
  topG,
};
