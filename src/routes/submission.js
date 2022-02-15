const router = require('express').Router()
const submissionController = require('../app/controllers/SubmissionControllers')

// create a topic
router.post('/create', submissionController.createSubmission)

// update a topic
router.put('/update/:id', submissionController.updateSubmission)

// delete a topic
router.delete('/delete/:id', submissionController.deleteSubmission)

// get a topic 
router.get('/one/:id', submissionController.getASubmission)

// get all topic
router.get('/all', submissionController.getAllSubmission)


module.exports = router