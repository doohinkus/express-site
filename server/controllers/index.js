const speakerService = require('../services/SpeakerServiceInstance').speakerService;
const feedbackService = require('../services/FeedbackServiceInstance').feedbackService;


exports.Favicon = (req, res, next) =>{
    return res.sendStatus(204);
}
exports.Index = async (req, res, next) =>{
    //must use async BEFORE using await
    //can also use .then WITHOUT asynch
    try{
        const promises = [];
        promises.push(speakerService.getListShort(), speakerService.getAllArtwork());
        const results = await Promise.all(promises);
        return res.render('index', {
            page: 'Home',
            speakerList: results[0],
            artwork: results[1]
        });
    } catch (err){
        console.log(err);
        next(err)
    }
   
};
exports.Speakers = async (req, res, next) =>{
    try{
        const promises = [];
        promises.push(speakerService.getList(), speakerService.getAllArtwork());
        const results = await Promise.all(promises);
        console.log(results[0])
        return res.render('speakers', {
            page: 'Speakers',
            speakerlist: results[0],
            artwork: results[1]
        });
    } catch (err){
        console.log(err);
        next(err)
    }
};

exports.SpeakerDetail = async (req, res, next) =>{
    try {
        // console.log(req.params.name)
        const results = await speakerService.getSpeakerInfo(req.params.name);
        if(!results) return next();
        return res.render('detail', {
            speakertitle: results.speakertitle,
            name: results.name,
            shortname: results.shortname,
            artwork: results.artwork,
            description: results.description
        });

    }catch(err){
        console.log(err);
        next(err);
    }
};
exports.Feedback = async (req, res, next) =>{
    try{
        const feedbackList = await feedbackService.getList();
    return res.render('feedback', {
        page: 'Feedback',
        feedbackList
    });

    }
    catch(err){
        console.log(err);
        next(err);
    }
};
exports.FeedbackSuccess = async (req, res, next) =>{
    try{
        const feedbackList = await feedbackService.getList();
    return res.render('feedback', {
        page: 'Feedback',
        feedbackList,
        success: true
    });

    }
    catch(err){
        console.log(err);
        next(err);
    }
};
exports.FeedbackPost = async (req, res, next) =>{
    try{
        const feedbackList = await feedbackService.getList();
        const fbname = req.body.fbname.trim();
        const fbtitle = req.body.fbtitle.trim();
        const fbmessage = req.body.fbmessage.trim();
        if (!fbname || !fbtitle || !fbmessage){
            return res.render('feedback', {
                page: 'Feedback',
                error: true,
                fbname,
                fbtitle,
                fbmessage,
                feedbackList
            });
        } 
        await feedbackService.addEntry(fbname, fbtitle, fbmessage);
        return res.redirect('/feedback/success');
    }
    catch(err){
        next(err);
    }
    // return res.send('received')

}