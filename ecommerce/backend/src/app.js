const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');
const logger = require('morgan');
const config = require('./config/config')
const connect  = require('./databases/mongodb')

const app = express();


// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('uploads'))
app.use(bodyParser.json())
app.use(cors())


app.listen(config.port)
console.log(`Server started on port ${config.port}`)
require('./routes')(app)

connect().then(()=>{console.log('conected');}).catch(err => console.log(err));

module.exports = app;
