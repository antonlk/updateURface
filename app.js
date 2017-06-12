var express = require('express');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var json = require('express-json');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors');

var routes = require('./api/routes/index');
var app = express();

// view engine setup
app.use(express.static(path.join(__dirname + '/front')));
app.set('view engine', 'cors');
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
 
app.use('/api', routes);

//protegemos las llamadas a la api
express.secret = 'DI00H4V0C00CCA&OBT&AQL00C0D3RTY00DI';
//app.use('/api',expressJwt({secret: express.secret}));

module.exports = app;

app.listen(80, function () {
    console.log('Node app is running');
});
