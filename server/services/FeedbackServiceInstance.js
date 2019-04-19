const FeedbackService = require('../services/FeedbackService');
const config = require('../configs');

exports.feedbackService = new FeedbackService(config.data.feedback);