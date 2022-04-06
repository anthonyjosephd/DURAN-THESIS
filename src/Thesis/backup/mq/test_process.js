const queueHelper = require('./helpers/queue-helper');

const mqServer = 'amqp://localhost';
const queueName = 'tracer_log';
const queueTimeout = 500;


const response = queueHelper.processMsgFromQueue(mqServer, queueName);

console.log(response.then(resp => { console.log(resp); }));