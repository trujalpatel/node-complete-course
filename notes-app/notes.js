const fs = require('fs');
const chalk = require('chalk')

const addNotes = (title, body) => {
    const notes = loadNotes();
    // const duplicateNotes = notes.filter((note) => note.title === title);
    const duplicateNote = notes.find((note) => note.title === title);
    // if(duplicateNotes.length === 0){
    if(!duplicateNote){   
        notes.push({
            title:title,
            body:body
        });
        saveNotes(notes);
        console.log(chalk.green.bold.inverse('New notes added!'));
    }else{
        console.log(chalk.red.bold.inverse('Duplicate notes found!'));
    }
}



const saveNotes = (notes) => {
    const jsonNotes = JSON.stringify(notes);
    const dataJson = fs.writeFileSync('notes.json',jsonNotes);
}
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return  JSON.parse(dataJson);
    }catch(e){
        return [];
    }
}

const removeNotes = (title) => {
 const notes = loadNotes();
 const duplicateNotes = notes.filter((note) => note.title !== title);
  if(notes.length > duplicateNotes.length){
    saveNotes(duplicateNotes);
    console.log(chalk.green.bold.inverse('Note removed!'));
  }else{
    console.log(chalk.red.bold.inverse('No notes found!'));
  }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue.inverse.bold('Your Notes....!!!'));
    notes.forEach(element => {
        console.log(element.title);
    });
}

const readNotes = (title) => {
    const notes = loadNotes();
    const readNotes = notes.find((note) => note.title == title);
    if(readNotes){
        console.log(chalk.blue.inverse.bold(readNotes.title));
        console.log(readNotes.body);
    }else{
        console.log(chalk.red.inverse.bold('No note found for the given title'));
    }
}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
};