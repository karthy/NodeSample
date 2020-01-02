const http = require("http");
	
let mysql = require('mysql');
let bodyParser = require('body-parser');
let express = require('express');
let app = express();
let config = require('./config.js');
let cors = require('cors');

let pool = mysql.createPool(config);

app.use(express.static('public'));

app.use(cors());

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

let articleRoute = require('./Routes/articleRoutes');


let updateSql = 'update * from article where id=?';

app.use('/article',articleRoute);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });