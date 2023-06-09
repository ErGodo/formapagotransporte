const express = require('express'); 
const app = express();
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const bodyParser = require('body-parser');

//importing routes
const formaPagoRoutes = require('./routes/formaspago');

const cors = require("cors");
app.use(cors({
    origin: ['http://otigo.cl', 'http://localhost:3000', 'https://otigo.cl' ]
  }));


//Settings 
app.set('port', process.env.PORT || 3011);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'baf3c85f075308',
    password: '2b185c89', 
    port: 3306, 
    database: 'heroku_ac5b0fe847456b7'
}, 'single'));


//routes
app.use('/', formaPagoRoutes);
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());


//static files
app.use(express.static(path.join(__dirname, 'public')));

//init server
app.listen(app.get('port'), ()=>{
    console.log('Server on port 3011');
});