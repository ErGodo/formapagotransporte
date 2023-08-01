const express = require('express'); 
const app = express();
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const bodyParser = require('body-parser');
const functions = require("firebase-functions");
const midleware = require('./midleware');
require('dotenv').config({ path:'./.env'});

//importing routes
const formaPagoRoutes = require('./routes/formaspago');

const cors = require("cors");
app.use(cors({
    origin: ['http://otigo.cl', 'http://localhost:3000', 'http://localhost:3001' , 'https://otigo.cl' ]
  }));

app.use(midleware.decodeToken);

//Settings 
app.set('port',  3011);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



//middlewares
app.use(express.json());
app.use(morgan('dev'));
/*app.use(myConnection(mysql, {
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'baf3c85f075308',
    password: '2b185c89', 
    port: 3306, 
    database: 'heroku_ac5b0fe847456b7'
}, 'single'));*/

//base de datos en cloud clusters 
app.use(myConnection(mysql, {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD, 
    port: process.env.DBPORT, 
    database: process.env.DATABASE
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

exports.formaPago = functions.https.onRequest(app);