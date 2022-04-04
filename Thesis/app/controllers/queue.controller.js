const express = require('express');
const router = express.Router();
const queueService = require('../services/queue.service');

// routes
router.post('/queues', create);

module.exports = router;

function create(req, res, next) {
    queueService.create_queue(req.body)
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}