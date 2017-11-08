var parseUrl = require('parseurl');
var express = require('express');
var send = require('send');
var path = require('path');
var app = express();
var port = 3000;

app.use('/', express.static('.'))

app.listen(port, function() {
  console.log('running on port', port);
});

