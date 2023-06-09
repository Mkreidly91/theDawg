const deafenService = require('./deafen.service');
const kreikService = require('./kreiks.service');
const lyricsService = require('./lyrics.service');

const muteService = require('./mute.service');
const pauseService = require('./pause.service');
const playService = require('./play.service');
const queueService = require('./queue.service');
const radioService = require('./radio.service');
const resumeService = require('./resume.service');
const searchService = require('./search.service');
const seekService = require('./seek.service');
const skipService = require('./skip.service');
const stopService = require('./stop.service');
const topG_service = require('./topG.service');

module.exports = {
  playService,
  pauseService,
  resumeService,
  stopService,
  seekService,
  skipService,
  radioService,
  queueService,
  lyricsService,
  searchService,
  kreikService,
  topG_service,
  muteService,
  deafenService,
};
