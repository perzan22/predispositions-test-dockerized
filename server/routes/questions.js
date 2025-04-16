const express = require('express')

const router = express.Router()

const QuestionsControllers = require('../controllers/questions')
const checkAuth = require('../middlewares/check-auth')

router.get('', QuestionsControllers.getQuestions)

router.get('/edit', checkAuth, QuestionsControllers.getQuestion)

router.patch('', checkAuth, QuestionsControllers.editQuestion)

router.post('', checkAuth, QuestionsControllers.addQuestion)

router.delete('', checkAuth, QuestionsControllers.deleteQuestion)

router.get('/type', QuestionsControllers.getQuestionTypes)

module.exports = router