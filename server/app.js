/////////////////////////////////////////
// FILE CONTAINS EXPRESS API INTARFACE // 
/////////////////////////////////////////

// import libraries

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')

// import route files

const answersRoutes = require('./routes/answers')
const questionsRoutes = require('./routes/questions')
const resultsRoutes = require('./routes/result')
const studyFieldsRoutes = require('./routes/study-fields')
const candidatesRoutes = require('./routes/candidates')
const authRoutes = require('./routes/auth')
const mailRoutes = require('./routes/mail')

// create new express instance

const app = express();

// cors middleware allows different domains
// to send requests

app.use(cors());

// bodyparser middleware parse data to json format

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// define api endpoints

app.use('/api/answers/', answersRoutes)
app.use('/api/questions/', questionsRoutes)
app.use('/api/results/', resultsRoutes)
app.use('/api/study-fields/', studyFieldsRoutes)
app.use('/api/candidates/', candidatesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/mail/', mailRoutes)

module.exports = app;