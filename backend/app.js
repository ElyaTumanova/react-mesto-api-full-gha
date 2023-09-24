/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable function-paren-newline */
/* eslint-disable no-console */

const express = require('express');
const cors = require('cors');

require('dotenv').config();

console.log(process.env.NODE_ENV);

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

process.on('uncaughtException', (err, origin) => {
  console.log(`${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`);
});

const { getUsersRouter, getUserByIdRrouter, createUserRouter } = require('./routes/users');
const { updateUserRouter, updateUserAvatarRouter, loginRouter } = require('./routes/users');
const {
  getCardsRouter, createCardRrouter, deleteCardByIdRouter, likeCardRouter, dislikeCardRouter,
} = require('./routes/cards');
const PageNotFoundError = require('./errors/page-not-found-err');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(cookieParser());

app.use(requestLogger);

app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginRouter);

app.post('/signup', createUserRouter);

app.use(auth);

app.use('/', createUserRouter);
app.use('/', getUsersRouter);
app.use('/', updateUserRouter);
app.use('/', getUserByIdRrouter);
app.use('/', updateUserAvatarRouter);

app.use('/', getCardsRouter);
app.use('/', createCardRrouter);
app.use('/', deleteCardByIdRouter);
app.use('/', likeCardRouter);
app.use('/', dislikeCardRouter);

app.use('*', (req, res, next) => next(new PageNotFoundError()),
  // res.status(404).send({message:'Страница не найдена'})
);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
