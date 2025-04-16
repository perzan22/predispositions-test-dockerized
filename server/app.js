// Import potrzebnych bibliotek
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')

// Import plików zarządzających trasami
const answersRoutes = require('./routes/answers')
const questionsRoutes = require('./routes/questions')
const resultsRoutes = require('./routes/result')
const studyFieldsRoutes = require('./routes/study-fields')
const candidatesRoutes = require('./routes/candidates')
const authRoutes = require('./routes/auth')
const mailRoutes = require('./routes/mail')

// Utworzenie instancji aplikacji express
const app = express();

// Middleware CORS umożliwia dostęp z różnych domen
app.use(cors());

// Middleware bodyParser parsuje dane w formacie JSON i z formularzy HTML
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Definiowanie endpointów
app.use('/api/answers/', answersRoutes)
app.use('/api/questions/', questionsRoutes)
app.use('/api/results/', resultsRoutes)
app.use('/api/study-fields/', studyFieldsRoutes)
app.use('/api/candidates/', candidatesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/mail/', mailRoutes)

module.exports = app;