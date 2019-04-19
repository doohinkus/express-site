const controllers = require('../controllers');

module.exports = (app) =>{
  app.route('/favicon.ico')
     .get(controllers.Favicon);
  app.route('/')
    .get(controllers.Index);
  app.route('/speakers')
    .get(controllers.Speakers);

  app.route('/speakers/:name')
    .get(controllers.SpeakerDetail);
    
  app.route('/feedback')
    .get(controllers.Feedback);

  app.route('/feedback')
    .post(controllers.FeedbackPost);

  app.route('/feedback/success')
    .get(controllers.FeedbackSuccess);
  }
