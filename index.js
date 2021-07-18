const express = require ('express');
const app = express();

const cors = require ('cors');
const bodyParser = require ('body-parser');

const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');
const errorMiddleware = require('./middleware/error');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/book', bookRouter);
app.use(errorMiddleware);
/*
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер стартовал, порт: ${PORT}`);
});
*/
const PORT = process.env.PORT || 3000;
const HostDb = process.env.DB_HOST || 'mongodb://94.228.115.129:27017/books_database'

async function start() {
    try {
        await 
            mongoose.connect(HostDb, {
            user: "root",
            pass: "password",
            dbName: "books_database",
            useNewUrlParser: true,
            useUnifiedTopology: true
            });
        // mongoose.connect('mongodb://94.228.115.129:27017/books_database');
        app.listen(PORT, () => {
            console.log(`Сервер стартовал, порт: ${PORT}`);
        })   
    } 
    catch (e) {
        console.log(e);   
}}
start();

const Todo = require('/models/todo');
const newTodo = new Todo({
    title: 'title...',
    desc: 'desc...',
});
try {
    await 
    newTodo.save();
} 
catch (e) {
    console.error(e);
}

