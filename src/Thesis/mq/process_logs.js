const queueHelper = require('./helpers/queue-helper');
const configs = require('./configs/api.json');
const queueName = 'tracer_log';
//const queueTimeout = 500;

const response = queueHelper.processMsgFromQueue(configs.mqBaseUrl, queueName);
console.log(response.then(resp => { console.log(resp); }));