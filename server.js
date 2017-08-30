'use strict';

const favicon = require('serve-favicon');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const http = require('http');

const __public = './public';
const port = process.env.PORT || 8080;

let app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, __public)));
app.use(favicon(path.join(__dirname, __public, 'favicon.ico')));

app.use('/*', function(req, res, next) {
    res.sendFile(path.join(__dirname, __public, 'index.html'));
});

let server = http.createServer(app);
server.listen(port);