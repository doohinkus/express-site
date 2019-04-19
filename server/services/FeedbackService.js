const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class FeedbackService{
    constructor(data){
        this.data = data;
    }
    async getList(){
        const data = await this.getData();
        // if(!data) return null;
        return data;
    }
    async addEntry(name, title, message){
        const data = await this.getData();
        data.unshift({name, title, message});
        return writeFile(this.data, JSON.stringify(data));

    }
    async getData(){
       const data =  await readFile(this.data, 'utf8');
       if(!data) return null;
       return JSON.parse(data);
       
    }
}
module.exports = FeedbackService;