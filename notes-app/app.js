

const getNotes = require('./notes.js')
const validator = require('validator')
const chalk = require('chalk')
const notes = getNotes()
console.log(notes);

console.log(validator.isEmail('testmailinator.com'))
console.log(validator.isURL('http://google.com'))
console.log(chalk.blue.italic.inverse('Success'))

// const fs = require('fs')
// fs.writeFileSync('test.txt','Testing data for .txt file.')
// fs.appendFileSync('test.txt',' Append testing data')
