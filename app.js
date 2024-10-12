// app.js

const express = require('express');
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const cors = require('cors');
const helmet = require('helmet');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes'); 
const connectorRoutes = require('./routes/connectorRoutes')
const pluginRoutes = require('./routes/pluginRoutes') 
const app = express(); 
// Middleware 
// Set storage engine
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(helmet());
var bodyParser = require('body-parser');
const { uploadFile } = require('./services/fileUploadandScanner');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/connector',connectorRoutes)
app.use('/api/manual-alerts',pluginRoutes)
app.post('/api/file_upload',uploadFile)
 
app.use('/images', express.static(__dirname + '/uploads'));
module.exports = app;
