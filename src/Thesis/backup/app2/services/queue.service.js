const queueHelper = require('../../mq/helpers/queue-helper');
const mqServer = 'amqp://localhost';
const queueName = 'tracer_log';
const queueTimeout = 500;


module.exports = {
    create_queue
};


async function create_queue(requestBody) {

    var msg = "";
    //console.log(requestBody);
    const pushResponse = await queueHelper.pushMsgToQueue(mqServer, queueName, requestBody);

    console.log(pushResponse);


    return { status: 200, message: msg };
}