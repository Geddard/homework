var express = require('express');
var path = require('path');

var app = express();

var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/resources', express.static(path.join(__dirname, 'resources')));

app.listen(port, function(){
    console.log('Started listening on port', port);
});