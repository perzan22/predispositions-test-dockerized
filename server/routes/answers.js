// Importowanie modułu express
const express = require('express')

// Utworzenie instancji routera express
const router = express.Router()

// Import kontrolera i middleware
const AnswersControllers = require('../controllers/answers')
const checkAuth = require('../middlewares/check-auth')

// Definiowanie tras API dla modelu odpowiedź
router.get('', AnswersControllers.getAnswers)

router.get('/all', AnswersControllers.getAllAnswers)

router.patch('', checkAuth, AnswersControllers.editAnswer)

router.post('', checkAuth, AnswersControllers.addNewAnswer)

router.delete('', checkAuth, AnswersControllers.deleteAnswer)

// Eksportowanie routera, aby używać go poza plikiem
module.exports = router