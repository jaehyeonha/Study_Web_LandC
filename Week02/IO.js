const readlineSync = require('readline-sync');
const fs = require('fs');

const History_FILE = 'histroy.json';


const entry = function(){
    let entry1 = readlineSync.question('date : ');
    if(entry1 == 'end'){
        return 'end';
    }
    let entry2 = readlineSync.question('category: ');
    let entry3 = readlineSync.question('detail: ');
    let entry4 = readlineSync.question('price: ')
    history = {
        date : entry1,
        category : entry2,
        detail : entry3, 
        price : entry4,
    }
    return history;
}

const read = function(){
    var historys = [];
    if (fs.existsSync(History_FILE)) {
        historys = JSON.parse(fs.readFileSync(History_FILE));
    }
    return historys;
}

let write = function (historys){
    fs.writeFileSync(History_FILE, JSON.stringify(historys));;
}


module.exports.entry = entry;
module.exports.read = read;
module.exports.write = write;