

const notes = require('./notes.js')
const validator = require('validator')
const yargs = require('yargs')

// console.log(validator.isEmail('testmailinator.com'))
// console.log(validator.isURL('http://google.com'))

// console.log(chalk.blue.italic.inverse('Success'))

// const notes = getNotes()
// console.log(notes);

const command = process.argv[2]

// if (command === 'add'){
//     console.log('Adding Notes..')
// }else if (command === 'remove'){
//     console.log('Removing Notes..')
// }

yargs.command({
    command:'add',
    describe: 'Add some notes',
    builder:{
        title:{
            describe:'Add My title',
            demandOption: true,
            title: 'string'
        },
        body:{
            describe:'Add body',
            demandOption: true,
            title: 'string'
        }
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body)
    } 
})

yargs.command({
    command:'remove',
    describe: 'Remove some notes',
    handler(argv){
        notes.removeNotes(argv.title)
    } 
})  

yargs.command({
    command:'listNotes',
    describe: 'List Command',
    handler() {
        notes.listNotes();
    } 

})

yargs.command({
    command:'readNotes',
    describe: 'Read Command',
    builder:{
        title:{
            describe:'Read notes',
            demandOption: true,
            title: 'string'
        },
        body:{
            describe:'Read notes body',
            demandOption: true,
            title: 'string'
        }
    },
    handler(argv){
        notes.readNotes(argv.title)
    }
})

yargs.parse();

// console.log(yargs.argv)

// const fs = require('fs')
// fs.writeFileSync('test.txt','Testing data for .txt file.')
// fs.appendFileSync('test.txt',' Append testing data')
