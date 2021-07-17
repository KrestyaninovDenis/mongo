const express = require('express');
const router = express.Router();

const Book = require('../models/book');

const fileMiddleware = require('../middleware/file');

const redis = require ('redis');
const REDIS_URL = process.env.REDIS_URL;
const client = redis.createClient({
    host: "redis",
    port: 6379
});
/*
const stor = {
    books: [],
}; 
[1, 2, 3, 4].map(el => {
    const newBook = new Book(`title ${el}`, `description ${el}`, `authors ${el}`, `favorite ${el}`, `fileCover ${el}`, `fileName ${el}`, `fileBook${el}`);
    stor.books.push(newBook);
});
*/
/*
router.get('/', (req, res) => { //получаем массив всех книг
    const {books} = stor;
    res.render("book/index", {
        title: "Список книг",
        books: books,
    });
});
*/
router.get('/', async (req, res) => {
    const Book = await Book.find();
    res.render("book/index", {
        title: "Список книг",
        books: Book,
    });
});
/*
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
*/
router.get('/create', (req, res) => {
    res.render("book/create", {
        title: "Создание книги",
        Book: {},
    });
});

router.post('/create', async (req, res) => {
    const {title, description, authors} = req.body;

    const newBook = new Book({
        title, description, authors
    });

    try {
        await newBook.save();
        res.redirect('/book');
    } catch (e) {
        console.error(e);
    }
});

/*
router.get('/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);
    if (idx !== -1) {


client.incr(idx, (err, rep) => {
    if (err) {
        res.status(500).json({ err: 'Ошибка redis: ' + err});
    } else {
        //res.json({ counter: rep});
        res.render("book/view", {
            title: "Просмотр книги"+rep,
            book: books[idx],
        });    
    }
})


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
*/

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
        title: "Просмотр книги",
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

    res.render("book/update", {
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



/*
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



module.exports = router;