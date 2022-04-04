const express = require('express');
const router = express.Router();
const forecastsService = require('../services/forecasts.service');
const {spawn} = require('child_process');

// routes
router.post('/forecasts', create);
router.post('/forecasts/findbydate', findByDateForecasts);
router.get('/forecasts/getstatcount/:id', getStatCount);
router.get('/forecasts/getlastforcast', getLastForecasts);
router.get('/forecasts/getallforcast', getAllForecasts);
router.get('/forecasts/getpercentage', getPercentage);
router.get('/forecasts/getforecastbymonth', getForecastByMonth);
router.get('/forecasts/runforecast', runForecast);

module.exports = router;

function create(req, res, next) {
    forecastsService.create(req.body)
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}

function findByDateForecasts(req, res, next) {
    forecastsService.findByDateForecasts(req.body)
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}

function getStatCount(req, res, next) {
    forecastsService.getStatCount(req.params.id)
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}

function getLastForecasts(req, res, next) {
    forecastsService.getLastForecasts()
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAllForecasts(req, res, next) {
    forecastsService.getAllForecasts()
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}

function getPercentage(req, res, next) {
    forecastsService.getPercentage()
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}

function getForecastByMonth(req, res, next) {
    forecastsService.getForecastByMonth()
        .then(req => req ? res.json(req) : res.sendStatus(404))
        .catch(err => next(err));
}

function runForecast(req, res, next) {
    const python = spawn('python3', ['/Users/josephanthonyduran/Desktop/Thesis/app/ml/run_forcasts.py']);
    python.stdout.on('data', function(data) {
        console.log('data from python');
        dataToSend = data.toString();
    });

    python.on('close', (code) => {
        console.log(code);
        res.send({script_stdout: python.stdout});
    })
}


    