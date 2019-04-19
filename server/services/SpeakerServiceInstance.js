const SpeakerService = require('../services/SpeakerService');
const config = require('../configs');

exports.speakerService = new SpeakerService(config.data.speakers);