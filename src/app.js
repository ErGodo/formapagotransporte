const express = require('express'); 
const app = express();
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const bodyParser = require('body-parser');

//importing routes
const formaPagoRoutes = require('./routes/formaspago');


//Settings 
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'transportesotisdb.ctzqtr9v0wfd.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Godo9801*.', 
    port: 3306, 
    database: 'otisdb'
}, 'single'));

//routes
app.use('/', formaPagoRoutes);
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());


//static files
app.use(express.static(path.join(__dirname, 'public')));

//init server
app.listen(app.get('port'), ()=>{
    console.log('Server on port 3000');
});