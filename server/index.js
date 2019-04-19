const express = require('express');
const createError = require('http-errors');
const path =require('path');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
const configs = require('./configs');
const SpeakerService = require('./services/SpeakerService');
const PORT =  3000;


const config = configs[app.get('env')];
const speakerService = new SpeakerService(config.data.speakers);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

app.use(express.static('public'));
app.use((req, res, next) => {
    res.locals.rendertime = new Date();
    return next();
});

app.use(bodyParser.urlencoded({ extended: true}));


app.locals.title = config.sitename;


app.use(async (req, res, next) => {
    try{
        const names = await speakerService.getNames();
        // console.log(names);
        res.locals.speakerNames = names;
        // added
        // res.locals.listShort = await speakerService.getListShort();
        
        return next();

    } catch (err){
        return next(err);
    }
})

routes(app);

app.use((req, res, next) => {
    return next(createError(404, 'Could not find your fucking file!'));
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.status = err.status || 500;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // res.status(status)
    return res.render('error');
})


app.listen(PORT, ()=>{
    console.log(`App listening on ${PORT}`);
});

module.exports = app;