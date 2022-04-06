const queueHelper = require('../../mq/helpers/queue-helper');
const mqServer = 'amqp://localhost';
const queueName = 'tracer_log';
const queueTimeout = 500;


module.exports = {
    create_queue
};


async function create_queue(requestBody) {
    const pushResponse = await queueHelper.pushMsgToQueue(mqServer, queueName, requestBody);
    console.log("from queue svc: " + pushResponse);

    if (pushResponse) {
        return { status_code: 200, message: "successfully queued!" };
    } else {
        return { status_code: 400, message: "error queueing!" };
    }
}