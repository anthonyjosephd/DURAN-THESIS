const express = require('express');
const router = express.Router();
const logService = require('../services/logs.service');

// routes
router.post('/logs', create);

module.exports = router;

function create(req, res, next) {
    logService.create(req.body)
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}