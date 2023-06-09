const deafenController = require("./deafen.controller");
const khallisneController = require("./khallisne.controller");
const kreiksController = require("./kreiks.controller");
const lyricsController = require("./lyrics.controller");
const muteController = require("./mute.controller");
const nukeController = require("./nuke.controller");
const pastaAKController = require("./pastaAK.controller");
const pauseController = require("./pause.controller");
const playController = require("./play.controller");
const queueController = require("./queue.controller");
const radioController = require("./radio.controller");
const resumeController = require("./resume.controller");
const searchController = require("./search.controller");
const seekController = require("./seek.controller");
const skipController = require("./skip.controller");
const stopController = require("./stop.controller");
const topGController = require("./topG.controller");
const undeafenController = require("./undeafen.controller");
const unmuteController = require("./unmute.controller");

module.exports = {
  muteController,
  unmuteController,
  deafenController,
  undeafenController,
  nukeController,
  khallisneController,
  pastaAKController,
  playController,
  pauseController,
  resumeController,
  stopController,
  seekController,
  skipController,
  radioController,
  queueController,
  lyricsController,
  searchController,
  kreiksController,
  topGController,
};
