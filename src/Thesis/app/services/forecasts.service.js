const Forecasts = require('../models/forecasts');
const db = require('../configs/mysql_db');
const trainDataService = require('../services/train_data.service');
const {spawn} = require('child_process');
module.exports = {
    create,
    findByDateForecasts,
    getStatCount,
    getLastForecasts,
    getAllForecasts,
    getForecastByMonth,
    getPercentage,
    execPyScript
    /*update,
    remove,
    findUser,
    findAll
    */
};


async function create(requestBody) {
    console.log(requestBody)
    return await Forecasts.create({
            "predict_noinfec": requestBody.predict_noinfec,
            "percentage": requestBody.percentage,
            "dateforecasts": requestBody.dateforecasts
        })
        .then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during inserting new forecasts: ", error); throw error; });
}

async function findByDateForecasts(requestBody) {
    console.log(requestBody)
    return await Forecasts.findOne({ where: { "dateforecasts": requestBody.dateForecasts } })
        .then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during getting user by rfid: ", error); throw error; });
}

async function getStatCount(locationId) {
    console.log(locationId)
    const querytStr = `SELECT (SELECT count(DISTINCT rfid)  as population_count FROM logs 
    WHERE locationid = :location_id and date(date) = (SELECT CURDATE())) as pop,
                     (SELECT count(DISTINCT l.rfid) as vac_count FROM logs l 
                     INNER JOIN users u ON u.rfid = l.rfid
                     INNER JOIN vaccinated_users vu ON vu.rfid = u.rfid 
                     WHERE l.locationid = :location_id and date(l.date) = (SELECT CURDATE()) and LOWER(vu.status) = 'completed') as vac,
 
                     (SELECT count(DISTINCT l.rfid) as occupation_count FROM logs l
                     INNER JOIN users u ON u.rfid = l.rfid
                     INNER JOIN occupations o ON o.id  = u.occupationid
                     WHERE l.locationid = :location_id and date(l.date) = (SELECT CURDATE()) and o.isHighRisk = 1) as occup`;
    return await db.query(querytStr, {
        replacements: {
            location_id: locationId
        },
        model: Forecasts
        }).then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during getting getStatCount: ", error); throw error; });
}

async function getLastForecasts() {
    return await Forecasts.findOne({ order: [['id', 'DESC']] })
        .then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during getting getLastForcasts: ", error); throw error; });
}

async function getAllForecasts() {
    return await Forecasts.findAll({ order: [['id', 'DESC']] })
        .then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during getting getAllForcasts: ", error); throw error; });
}

async function getPercentage() {
    const last_train_data = await trainDataService.getLastTrainData();
    const  last_forecast = await getLastForecasts();
    
    population = 0;
    predict_noinfec = 0;
    
    if (last_train_data.population) {
        population = parseFloat(last_train_data.population);
    } else {
        throw new Error("invalid last train data - population");
    }
    
    if (last_forecast.predict_noinfec) {
        predict_noinfec = parseFloat(last_forecast.predict_noinfec);
    } else {
        throw new Error("invalid last forecast - no_infec");
    }

    return {
        percentage: (predict_noinfec / population) * 100
    }
}

async function getForecastByMonth() {
    
    const querytStr = `SELECT 

    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 1 AND YEAR(dateforecasts) = :current_yr 
    ORDER BY dateforecasts DESC LIMIT 1)  as Jan,
    
    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 2 AND YEAR(dateforecasts) = :current_yr 
    ORDER BY dateforecasts DESC LIMIT 1)  as Feb,
    
    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 3 AND YEAR(dateforecasts) = :current_yr 
    ORDER BY dateforecasts DESC LIMIT 1)  as March,
    
    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 4 AND YEAR(dateforecasts) = :current_yr 
    ORDER BY dateforecasts DESC LIMIT 1)  as April,
    
    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 5 AND YEAR(dateforecasts) = :current_yr 
    ORDER BY dateforecasts DESC LIMIT 1)  as May,
    
    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 6 AND YEAR(dateforecasts) = :current_yr 
    ORDER BY dateforecasts DESC LIMIT 1)  as June,
    
    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 7 AND YEAR(dateforecasts) = :current_yr 
    ORDER BY dateforecasts DESC LIMIT 1)  as July,
    
    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 8 AND YEAR(dateforecasts) = :current_yr
    ORDER BY dateforecasts DESC LIMIT 1)  as August,
    
    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 9 AND YEAR(dateforecasts) = :current_yr
    ORDER BY dateforecasts DESC LIMIT 1)  as September,
    
    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 10 AND YEAR(dateforecasts) = :current_yr
    ORDER BY dateforecasts DESC LIMIT 1)  as October,
    
    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 11 AND YEAR(dateforecasts) = :current_yr 
    ORDER BY dateforecasts DESC LIMIT 1)  as November,
    
    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 12 AND YEAR(dateforecasts) = :current_yr 
    ORDER BY dateforecasts DESC LIMIT 1)  as December`;
    return await db.query(querytStr, {
        replacements: {
            current_yr: new Date().getFullYear()
        },
        model: Forecasts
        }).then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during getting getForecastByMonth: ", error); throw error; });
}

async function getLastYearForecast() {
    
    const querytStr = `SELECT 

    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 1 AND YEAR(dateforecasts) = :current_yr 
    ORDER BY dateforecasts DESC LIMIT 1)  as Jan,
    
    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 2 AND YEAR(dateforecasts) = :current_yr 
    ORDER BY dateforecasts DESC LIMIT 1)  as Feb,
    
    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 3 AND YEAR(dateforecasts) = :current_yr 
    ORDER BY dateforecasts DESC LIMIT 1)  as March,
    
    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 4 AND YEAR(dateforecasts) = :current_yr 
    ORDER BY dateforecasts DESC LIMIT 1)  as April,
    
    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 5 AND YEAR(dateforecasts) = :current_yr 
    ORDER BY dateforecasts DESC LIMIT 1)  as May,
    
    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 6 AND YEAR(dateforecasts) = :current_yr 
    ORDER BY dateforecasts DESC LIMIT 1)  as June,
    
    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 7 AND YEAR(dateforecasts) = :current_yr 
    ORDER BY dateforecasts DESC LIMIT 1)  as July,
    
    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 8 AND YEAR(dateforecasts) = :current_yr
    ORDER BY dateforecasts DESC LIMIT 1)  as August,
    
    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 9 AND YEAR(dateforecasts) = :current_yr
    ORDER BY dateforecasts DESC LIMIT 1)  as September,
    
    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 10 AND YEAR(dateforecasts) = :current_yr
    ORDER BY dateforecasts DESC LIMIT 1)  as October,
    
    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 11 AND YEAR(dateforecasts) = :current_yr 
    ORDER BY dateforecasts DESC LIMIT 1)  as November,
    
    (SELECT predict_noinfec FROM forecasts 
    WHERE MONTH(dateforecasts) = 12 AND YEAR(dateforecasts) = :current_yr 
    ORDER BY dateforecasts DESC LIMIT 1)  as December`;
    return await db.query(querytStr, {
        replacements: {
            current_yr: new Date().getFullYear() - 1
        },
        model: Forecasts
        }).then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during getting getForecastByMonth: ", error); throw error; });
}

function execPyScript() {
    const python = spawn('python3', ['/Users/josephanthonyduran/Desktop/Thesis/app/ml/run_forcasts.py']);
    
    python.stdout.on('data', function(data) {
        console.log('data from python');
        dataToSend = data.toString();
    });

    python.on('close', (code) => {
        console.log(code);
    })
}
