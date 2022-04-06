//require('rootpath')();
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(cors());

//Users routes
app.use('/api', require('../controllers/users.controller'));
app.use('/api', require('../controllers/queue.controller'));
app.use('/api', require('../controllers/logs.controller'));

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function() {
    console.log('Server listening on port ' + port);
});

module.exports = server;