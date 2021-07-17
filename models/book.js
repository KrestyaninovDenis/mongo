const uidGenerator = require ('node-unique-id-generator');

class Book {
    constructor (
      title = '', 
      description = '', 
      authors = '', 
      favorite = '', 
      fileCover = '', 
      fileName = '', 
      fileBook = '', 
      id = uidGenerator.generateUniqueId()
      ) { 
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.fileBook = fileBook;
      }
}

module.exports = Book;


const {Schema, model} = require('mongoose');
const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        default: "",
    },
    date: {
        type: Date,
        default: Date.now,
    }
});
module.exports = model('Book', todoSchema);