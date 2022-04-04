#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
//const AMQP_RECEIVE_URL='amqp://localhostguest:guest@rabbitmq:5672';

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'tracer_log';

        //for (let x = 0; x <= 10000; x++) {
        const payload = {
            rfid: `dfgdfg424234`,
            location: 'wvsu_main',
            date: '2021-05-22: 10:00PM',
            log_type: 'in',
            last_temp: '36.9'
        };

        channel.assertQueue(queue, {
            durable: true
        });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)), { persistent: true });

        console.log(" [x] Sent %s", payload);
        //}

    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});