const path = require('path');
module.exports = {
    development: {
        sitename: 'Node Site [Development]',
        data: {
            speakers: path.join(__dirname, '../data/speakers.json'),
            feedback: path.join(__dirname, '../data/feedback.json')
        }
    },
    production: {
        sitename: 'Node Site',
    },
    data: {
        speakers: path.join(__dirname, '../data/speakers.json'),
        feedback: path.join(__dirname, '../data/feedback.json')
    }

}