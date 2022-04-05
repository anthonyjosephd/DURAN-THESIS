const express = require('express');
const router = express.Router();
const logService = require('../services/logs.service');

// routes
router.post('/logs', create);
router.get('/logs', findAll);
router.get('/logs/:id', findByUser);
router.post('/logs/getlogsbydaterange', getLogsByDateRange);
router.post('/logs/list', listLogs);


module.exports = router;

function create(req, res, next) {
    logService.create(req.body)
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}

function findAll(req, res, next) {
    logService.findAll()
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}

function listLogs(req, res, next) {
    logService.getAllLogs()
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}

function findByUser(req, res, next) {
    logService.findByUser(req.params.id)
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}

function getLogsByDateRange(req, res, next) {
    logService.getLogsByDateRange(req.body)
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}