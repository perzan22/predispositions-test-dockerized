const express = require('express')

const router = express.Router()

const StudyFieldsControllers = require('../controllers/study-fields')
const checkAuth = require('../middlewares/check-auth')

router.get('', StudyFieldsControllers.getStudyFields)

router.get('/edit', StudyFieldsControllers.getStudyField)

router.post('', checkAuth, StudyFieldsControllers.addStudyField)

router.patch('', checkAuth, StudyFieldsControllers.editStudyField)

router.delete('', checkAuth, StudyFieldsControllers.deleteStudyField)

module.exports = router