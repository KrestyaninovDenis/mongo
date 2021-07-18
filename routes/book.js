const express = require('express');
const router = express.Router();




const Todo = require('../models/book')

router.get('/', async (req, res) => {
    const todo = await Todo.find();
    res.render("book/index", {
        title: "ToDo",
        books: todo,
    });
});

router.get('/create', (req, res) => {
    res.render("book/create", {
        title: "ToDo | create",
        book: {},
    });
});

router.post('/create', async (req, res) => {
    const {title, description, authors} = req.body;

    const newTodo = new Todo({
        title, description, authors
    });

    try {
        await newTodo.save();
        res.redirect('/book');
    } catch (e) {
        console.error(e);
    }
});


/*
const {Book} = require('../models');
const stor = {
    books: [],
}; 
[1, 2, 3, 4].map(el => {
    const newBook = new Book(`title ${el}`, `description ${el}`, `authors ${el}`, `favorite ${el}`, `fileCover ${el}`, `fileName ${el}`, `fileBook${el}`);
    stor.books.push(newBook);
});

router.get('/', (req, res) => { //получаем массив всех книг
    const {books} = stor;
    res.render("book/index", {
        title: "Список книг",
        books: books,
    });
});

router.get('/create', (req, res) => {
    res.render("book/create", {
        title: "Создание книги",
        Book: {},
    });
});

router.post('/create', (req, res) => {
    const {books} = stor;
    const {title, description, authors} = req.body;
    const newBook = new Book(title, description, authors);
    books.push(newBook);
    res.redirect('/book')
});

router.get('/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);
    if (idx !== -1) {
        res.render("book/view", {
            title: "Просмотр книги",
            book: books[idx],
        });    
    } else {
        res.status(404).redirect('/404');
    }
});

router.get('/update/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);
    if (idx !== -1) {
        res.render("book/update", {
            title: "Редактирование книги",
            Book: books[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/update/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const {title, description, authors} = req.body;
    const idx = books.findIndex(el => el.id === id);
    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            description,
            authors
        };
        res.redirect(`/book/${id}`);
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/delete/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.redirect(`/book`);
    } else {
        res.status(404).redirect('/404');
    }
});
*/

module.exports = router;
