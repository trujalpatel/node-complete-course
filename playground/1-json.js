const fs = require('fs');

const student = {
    name: 'test',
    age: '18'
}

const jsonData = JSON.stringify(student);
// fs.writeFileSync('1-json.json',jsonData);

const readFile = fs.readFileSync('1-json.json');
const dataJson = readFile.toString();
const dataparse = JSON.parse(dataJson);
dataparse.name = 'Trujal';
dataparse.planate = 'Pluto';
dataparse.age = '22';

const JsonData = JSON.stringify(dataparse);
fs.writeFileSync('1-json.json',JsonData);