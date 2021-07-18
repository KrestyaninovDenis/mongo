const express = require('express');
const router = express.Router();




const Book = require('../models/book')

router.get('/', async (req, res) => {
    const book = await Book.find();
    res.render("book/index", {
        title: "ToDo",
        books: book,
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

    const newTodo = new Book({
        title, description, authors
    });

    try {
        await newTodo.save();
        res.redirect('/book');
    } catch (e) {
        console.error(e);
    }
});


router.get('/:id', async (req, res) => {
    const {id} = req.params;
    let book;
    try {
        book = await Book.findById(id);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.render("book/view", {
        title: "ToDo | view",
        book: book,
    });
});

router.get('/update/:id', async (req, res) => {
    const {id} = req.params;
    let book;
    try {
        book = await Book.findById(id);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.render("todo/update", {
        title: "ToDo | view",
        book: book,
    });
});

router.post('/update/:id', async (req, res) => {
    const {id} = req.params;
    const {title, description, authors} = req.body;

    try {
        await Book.findByIdAndUpdate(id, {title, description, authors});
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.redirect(`/book/${id}`);
});

router.post('/delete/:id', async (req, res) => {
    const {id} = req.params;

    try {
        await Book.deleteOne({_id: id});
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.redirect(`/book`);
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
