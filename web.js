"use strict";

require('dotenv').config({ path: 'a.env'});

const app = require('./app');
const http = require('http');

// const {socketio} = require('./middleware/socketio');

const port = process.env.PORT || process.env.S_PORT || 8001;
const server = http.createServer(app);
server.listen(port, () => {
    console.log('Server on ' + port);
});

// socketio(server, app);

module.exports = server;


