/////////////////////////////////////////////////
// ROUTES FILE TO REDIRECT CANDIDATES REQUESTS // 
/////////////////////////////////////////////////

const express = require('express')

const router = express.Router()

const CandidateControllers = require('../controllers/candidates')
const checkAuth = require('../middlewares/check-auth')

router.post('', CandidateControllers.createCandidate)

router.get('', CandidateControllers.getCandidates)

router.delete('', checkAuth, CandidateControllers.deleteCandidate)

module.exports = router