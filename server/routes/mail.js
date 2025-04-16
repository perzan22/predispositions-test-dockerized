const express = require('express')

const router = express.Router()

const MailControllers = require('../controllers/mail')

router.post('', MailControllers.sendMail);

module.exports = router