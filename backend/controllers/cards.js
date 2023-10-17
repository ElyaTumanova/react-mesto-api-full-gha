/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { default: mongoose } = require('mongoose');
const Card = require('../models/card');

const NotFoundError = require('../errors/not-found-err');
const ServerError = require('../errors/server-error');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenRequestError = require('../errors/forbidden-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError());
        // res.status(400).send({ message: 'Несуществующий Id' })
      }
      return next(new ServerError());
      // return res.status(500).send({ message: 'На сервере произошла ошибка' })
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        return next(new BadRequestError());
        // res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' })
      }
      return next(new ServerError());
      // return res.status(500).send({ message: 'На сервере произошла ошибка' })
    });
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      console.log('card');
      if (!card) {
        return next(new NotFoundError());
      // res.status(404).send({ message: 'Карточки с таким Id не существует' })
      }
      if (card.owner.toString() !== req.user._id) {
        return next(new ForbiddenRequestError());
        // res.status(403).send({ message: 'Нелья удалить чужую карточку' })
      }
      Card.findByIdAndRemove(req.params.cardId, { new: true })
        .then((card) => {
          res.send(card);
        });
    })
    .catch((err) => {
      console.log(err);
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError());
        // res.status(400).send({ message: 'Карточки с таким Id не существует' })
      }
      return next(new ServerError());
      // return res.status(500).send({ message: 'На сервере произошла ошибка' })
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return next(new NotFoundError());
      // res.status(404).send({ message: 'Карточки с таким Id не существует' })
      }
      console.log(card);
      console.log(card.likes);
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError());
      // res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятия лайка' })
      }
      return next(new ServerError());
    // return res.status(500).send({ message: 'На сервере произошла ошибка' })
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return next(new NotFoundError());
      // res.status(404).send({ message: 'Карточки с таким Id не существует' })
      }
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(BadRequestError());
      // res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятия лайка' })
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError());
      // res.status(404).send({ message: 'Карточки с таким Id не существует' })
      }
      return next(new ServerError());
    // return res.status(500).send({ message: 'На сервере произошла ошибка11' })
    });
};
