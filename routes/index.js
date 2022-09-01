const express = require('express');

// Import our modular routers for /tips and /feedback
const apiRoutes = require('./apiRoutes');


const app = express();

app.use('./api/notes', apiRoutes);


module.exports = app;
