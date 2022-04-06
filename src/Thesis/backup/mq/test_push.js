//for (let x = 0; x <= 5000; x++) {
const queueHelper = require('./helpers/queue-helper');

const mqServer = 'amqp://localhost';
const queueName = 'tracer_log';
const queueTimeout = 75;
const payload = {
    rfid: `dfgdfg424234`,
    location: 'wvsu_main',
    date: '2021-05-22: 10:00PM',
    log_type: 'in',
    last_temp: '36.9'
};

const pushResponse = queueHelper.pushMsgToQueue(mqServer, queueTimeout, queueName, payload);

pushResponse.then(resp => { console.log(resp) });
//}