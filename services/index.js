const lyricsService = require("./lyrics.service");
const membersVoiceService = require("./membersVoice.service");
const pauseService = require("./pause.service");
const playService = require("./play.service");
const queueService = require("./queue.service");
const radioService = require("./radio.service");
const resumeService = require("./resume.service");
const seekService = require("./seek.service");
const skipService = require("./skip.service");
const stopService = require("./stop.service");
module.exports = {
  membersVoiceService,
  playService,
  pauseService,
  resumeService,
  stopService,
  seekService,
  skipService,
  radioService,
  queueService,
  lyricsService,
};
