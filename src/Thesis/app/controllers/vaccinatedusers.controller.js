const express = require('express');
const router = express.Router();
const vaccinateduserService = require('../services/vaccinatedusers.service');
const authorize = require('../helpers/authorize');

// routes
router.post('/vaccinatedusers', create);
router.put('/vaccinatedusers', update);
router.delete('/vaccinatedusers/:id', remove);
router.get('/vaccinatedusers', findAll);
router.get('/vaccinatedusers/getbyid/:id', getById);

module.exports = router;

function create(req, res, next) {
    vaccinateduserService.create(req.body)
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    vaccinateduserService.update(req.body)
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}

function remove(req, res, next) {
    vaccinateduserService.remove(req.params.id)
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}


function findAll(req, res, next) {
    vaccinateduserService.findAll()
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    vaccinateduserService.getById(req.params.id)
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}