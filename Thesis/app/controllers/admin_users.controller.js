const express = require('express');
const router = express.Router();
const adminUsers = require('../services/admin_users.service');

// routes
router.post('/admin', create);
router.post('/admin/auth', auth);


module.exports = router;

function create(req, res, next) {
    adminUsers.create(req.body)
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}

function auth(req, res, next) {
    adminUsers.authenticate(req.body)
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}