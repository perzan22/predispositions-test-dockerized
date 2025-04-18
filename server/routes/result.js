/////////////////////////////////////////////
// ROUTES FILE TO REDIRECT RESULT REQUESTS // 
/////////////////////////////////////////////

const express = require('express')

const router = express.Router()

const ResultControllers = require('../controllers/result')

router.post('/getResult', ResultControllers.getTestResult)

router.post('', ResultControllers.addNewResult)

module.exports = router