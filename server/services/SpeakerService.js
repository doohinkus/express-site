const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

class SpeakerService{
    constructor(data){
        this.data =data;
    }
    async getNames(){
        const data = await this.getData();
        return data.map(speaker => { 
            return {
                name: speaker.name, 
                shortname: speaker.shortname 
            }
        });
    }
    async getSpeakerInfo(shortname){
        const data = await this.getData();
        const result = data.find(speaker => { 
            return shortname === speaker.shortname;
        });
        return data.length > 0 ? {
            speakertitle: result.title,
            name: result.name,
            shortname: result.shortname,
            artwork: result.artwork,
            description: result.description
        } : null
    }

    async getListShort(){
        const data = await this.getData();
        return data.map(speaker => {
            return {
                name: speaker.name, 
                shortname: speaker.shortname,
                title: speaker.title 
            }
        })
    }
    async getList(){
        const data = await this.getData();
        return data.map(speaker => {
            return {
                name: speaker.name, 
                shortname: speaker.shortname,
                title: speaker.title,
                summary: speaker.summary
            }
        })
    }
    async getAllArtwork(){
        const data = await this.getData();
        const artwork = data.reduce((acc, el) =>{
            if (el.artwork){
                acc = [...acc, ...el.artwork];
            }
            return acc;
        }, []);
        return artwork;
    }
    async getData(){
        const data = await readFile(this.data, 'utf8');
        if(!data) return [];
        return JSON.parse(data).speakers;
    }

}
module.exports = SpeakerService;