const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-error');
const AuthError = require('../errors/auth-error');

// const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(() => next(new Error('На сервере произошла ошибка')));
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError());
        // return res.status(404).send({ message: 'Пользователя с таким Id не существует1' })
      }
      return res.send(user);
    })

    .catch((e) => {
      if (e instanceof mongoose.Error.CastError) {
        return next(new BadRequestError());
      }
      return next(new Error('На сервере произошла ошибка'));
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then(() => res.status(201).send({
      name, about, avatar, email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError());
      } if (err.code === 11000) {
        return next(new ConflictError());
      }
      return next(new Error('На сервере произошла ошибка'));
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true }).orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError());
        // res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' })
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError());
        // res.status(404).send({ message: 'Пользователя с таким Id не существует' })
      }
      return next(new Error('На сервере произошла ошибка'));
      // return res.status(500).send({ message: 'На сервере произошла ошибка' })
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true }).orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError());
      }
      return next(new Error('На сервере произошла ошибка'));
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, 'some-secret-key');
      // вернём токен
      return res.send({ token });
    })
    // eslint-disable-next-line no-undef
    .catch(() => next(new AuthError()));
};

module.exports.getMyUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError());
        // res.status(404).send({ message: 'Пользователя с таким Id не существует' })
      }
      return res.send(user);
    })
    .catch(() => next(new Error('На сервере произошла ошибка')));
};
