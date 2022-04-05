const axios = require('axios');
const amqplib = require('amqplib');
const queue_prefetch = 1;
const configs = require('../configs/api.json');

// push message to queue
async function pushMsgToQueue(mqServer, queueName, payload) {
    const open = amqplib.connect(mqServer);

    // connect to rabbitmq
    return open.then(function(conn) {
        return conn.createConfirmChannel();
    }).then(async function(ch) {
        const ok = await ch.assertQueue(queueName, { durable: true });
        return ch.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)), { persistent: true },
            function(err, ok) {
                if (err !== null)
                    return true; //console.warn('Message nacked!');
                else
                    return false; //console.log('Message acked!');
            });
    }).catch(error => { console.log(`error sending message a: ${error}`) });
}

async function processMsgFromQueue(mqServer, queueName) {
    var open = amqplib.connect(mqServer);
    return open.then(function(conn) {
        return conn.createChannel();
    }).then(async function(ch) {
        const ok = await ch.assertQueue(queueName, { durable: true });
        const okPrep = await ch.prefetch(queue_prefetch);
        return await ch.consume(queueName, function(msg) {
            if (msg !== null) {
                payload_json = JSON.parse(msg.content.toString());
                console.log(payload_json);

                // api to save to db
                const response = axios({
                    method: 'post',
                    url: `${configs.appBaseUrl}/api/logs`,
                    data: {
                        "id": payload_json.id,
                        "rfid": payload_json.rfid,
                        "locationid": payload_json.locationid,
                        "logtype": payload_json.logtype,
                        "usertemp": payload_json.usertemp,
                        "date": payload_json.date
                    }
                });

                setTimeout(() => {

                    //acknowledge
                    response.then(resp => {
                        if (resp.status === 200) {
                            ch.ack(msg);
                            console.log(resp.status);
                        } else {
                            // send to dead-queue
                            const pushResponse = pushMsgToQueue(mqServer, "dead-queue", payload_json);
                            console.log(pushResponse);
                            ch.ack(msg);
                        }
                    }).catch(error => {
                        // send to dead-queue
                        const pushResponse = pushMsgToQueue(mqServer, "dead-queue", payload_json);
                        console.log(pushResponse);
                        ch.ack(msg);
                    });

                }, 500);
            }
        });
    }).catch(console.warn);

}


module.exports = {
    pushMsgToQueue,
    processMsgFromQueue
}