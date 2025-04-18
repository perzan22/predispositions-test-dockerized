//////////////////////////////////////////////
// ROUTES FILE TO REDIRECT ANSWERS REQUESTS // 
//////////////////////////////////////////////

const express = require('express')

const router = express.Router()

const AnswersControllers = require('../controllers/answers')
const checkAuth = require('../middlewares/check-auth')

router.get('', AnswersControllers.getAnswers)

router.get('/all', AnswersControllers.getAllAnswers)

router.patch('', checkAuth, AnswersControllers.editAnswer)

router.post('', checkAuth, AnswersControllers.addNewAnswer)

router.delete('', checkAuth, AnswersControllers.deleteAnswer)

module.exports = router