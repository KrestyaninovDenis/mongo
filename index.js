const express = require ('express');
const app = express();

const cors = require ('cors');
const bodyParser = require ('body-parser');

const indexRouter = require('./routes/index');
const bookAPIRouter = require('./routes/API/book');
const bookRouter = require('./routes/book');

//const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser());
app.use(cors());
//app.use(loggerMiddleware);
app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/book', bookRouter);
app.use('/api/book', bookAPIRouter);
app.use(errorMiddleware);

//const PORT = 3000;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер стартовал, порт: ${PORT}`);
});
