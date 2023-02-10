const { resumeController } = require("../controllers");
const { voiceConnectionError } = require("../Errors/voiceErrors");

const resume = async (message) => {
  if (voiceConnectionError(message)) return;
  resumeController(message);
};

module.exports = resume;
