const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');

const errorMiddleware = require('./middleware/error');

const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');
const app = express();

//const cors = require ('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(cors());
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
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'password';
const NameDB = process.env.DB_NAME || 'todos_database'
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/'
async function start() {
    try {        
        await mongoose.connect(HostDb, {
            user: UserDB,
            pass: PasswordDB,
            dbName: NameDB,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => {
            console.log(`Старт сервера ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();