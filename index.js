const express = require('express');
const path = require('path');
require('dotenv').config();

// DB config
const { dbConnection } = require('./database/config');
dbConnection();

// App
const app = express();

// Read and body parse
app.use(express.json());

// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// Path público
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Routes
app.use('/api/auth', require('./routes/auth'));

server.listen(process.env.PORT, (err) => {

  if (err) throw new Error(err);

  console.log('Servidor corriendo en puerto', process.env.PORT);

});
