//for (let x = 0; x <= 5000; x++) {
const queueHelper = require('./helpers/queue-helper');
const configs = require('./configs/api.json');
//const mqServer = 'amqp://localhost';
const queueName = 'tracer_log';
const queueTimeout = 75;
const payload = {
    id: `A12345678912345-20210720040200`,
    rfid: `dfgdfg424234`,
    locationid: '1',
    date: '2021-07-20 12:00:00',
    logtype: '1',
    usertemp: '36.9'
};


const pushResponse = queueHelper.pushMsgToQueue(configs.mqBaseUrl, queueName, payload);
pushResponse.then(resp => { console.log(resp) });
//}