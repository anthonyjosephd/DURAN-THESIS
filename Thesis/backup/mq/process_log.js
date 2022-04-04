#!/usr/bin/env node

const axios = require('axios');
const amqp = require('amqplib/callback_api');
const queue_name = "tracer_log";
const queue_prefetch = 1;

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertQueue(queue_name, {
            durable: true
        });

        channel.prefetch(queue_prefetch);

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue_name);

        channel.consume(queue_name, function(payload) {
            console.log(" [x] Received %s", payload.content.toString());
            payload_json = JSON.parse(payload.content.toString());

            // api to save to db
            /* const response = axios({
                    method: 'post',
                    url: 'http://localhost:4000/api/logs',
                    data: {
                        "rfid": payload_json.rfid,
                        "location": payload_json.location,
                        "last_login": payload.last_login,
                        "log_type": payload_json.log_type,
                        "date_log": payload_json.date_log
                    }
            });*/

            setTimeout(function() {
                /*
                if (response.status_code === 200) {
                    channel.ack(payload);
                    console.log(response.status_code);
                } else {
                    // send to dead-queue
                    console.log(response.status_code);
                    channel.ack(payload);
                } */

                channel.ack(payload);
                console.log(payload_json);

            }, 75);
        });
    });
});