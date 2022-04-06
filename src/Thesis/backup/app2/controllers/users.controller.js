const express = require('express');
const router = express.Router();
const userService = require('../services/users.service');

// routes
router.post('/users', create);
router.put('/users/:id', update);
router.delete('/users/:id', remove);
router.get('/users/:id', findUser);
router.get('/users', findAll);

module.exports = router;

function create(req, res, next) {
    userService.create(req.body)
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}

function remove(req, res, next) {
    userService.remove(req.body.id)
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}

function findUser(req, res, next) {
    userService.findUser(req.params.id)
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}

function findAll(req, res, next) {
    userService.findAll()
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}