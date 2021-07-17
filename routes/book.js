const express = require('express');
const router = express.Router();
const {Book} = require('../models');
const fileMiddleware = require('../middleware/file');
const redis = require ('redis');
const REDIS_URL = process.env.REDIS_URL;
const client = redis.createClient({
    host: "redis",
    port: 6379
});

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
/*
router.post('/', (req, res) => { //создаем книги и возврашаем ее же вместе с присвоенным id
    const {books} = stor;
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
    books.push(newBook);
    res.status(201);
    res.json(newBook);
});

router.put('/:id', (req, res) => { //редактируем объект книги, если запись не найдено вернем Code: 404
    const {books} = stor;
    const {id} = req.params;
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
    const idx = books.findIndex (el => el.id === id);
    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook
        };
        res.json(books[idx]);
    }
    else
    {
        res.status (404);
        res.json ('запись не найдена')
    }
});
*/


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
/*
router.delete('/:id', (req, res) => { //удаляем книгу и возвращаем ответ: 'ok'
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex (el => el.id === id);
    if (idx !== -1) {
        books.splice(idx,1)
        res.json(true);
        res.json('ok')
    }
    else
    {
        res.status (404);
        res.json ('запись не найдена')
    }
});
*/
/*
// загрузка файлов
router.post('/download', fileMiddleware.single('book-txt'), (req, res) => {
    if (req.file) {
        const {path} = req.file;
        res.json(path);
    } else {
        res.json(null);
    }
});

router.get('/:id/download', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    //const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
    const idx = books.findIndex (el => el.id === id);
    if (idx !== -1) {
        res.download(__dirname+'/../public/txt/'+books[idx].fileBook+'.txt', 'load book', err=>{
            if (err){
                res.status(404).json();
            }
        });
    }
    else
    {
        res.status (404);
        res.json ('запись не найдена')
    }
    console.log(books[idx].fileBook)

});
*/


module.exports = router;
