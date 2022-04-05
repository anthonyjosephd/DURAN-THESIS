const express = require('express');
const router = express.Router();
const train_dataService = require('../services/train_data.service');

// routes
router.post('/train_data', create);
router.get('/train_data', getAll);
router.get('/train_data/getlasttraindata', getLastTrainData);

module.exports = router;

function create(req, res, next) {
    train_dataService.create(req.body)
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    train_dataService.findAll()
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}

function getLastTrainData(req, res, next) {
    train_dataService.getLastTrainData()
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}

