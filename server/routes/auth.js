/////////////////////////////////////////////////////
// ROUTES FILE TO REDIRECT AUTHENTICATION REQUESTS // 
/////////////////////////////////////////////////////

const express = require('express')

const router = express.Router()

const AuthControllers = require('../controllers/auth')

router.post('', AuthControllers.login)

router.patch('', AuthControllers.changePassword)

router.post('/newAdmin', AuthControllers.addAdmin)

module.exports = router