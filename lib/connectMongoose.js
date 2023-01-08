'use strict';

// Load libraries
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

// Manage connection events
mongoose.connection.on('error', err => {
    console.log('Error de conexión a MongoDB', err);
    process.exit(1);
});

mongoose.connection.once('open', () => {
    console.log('Conectado a MongoDB en', mongoose.connection.name);
});

// Launch the connection
mongoose.connect('mongodb://127.0.0.1/anuncios');

// Export the connection
module.exports = mongoose.connection;