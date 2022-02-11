const router = require('express').Router()
const topicController = require('../app/controllers/TopicControllers')

// create a topic
router.post('/create', topicController.createTopic)

// update a topic
router.put('/update/:id', topicController.updateTopic)

// delete a topic
router.delete('/delete/:id', topicController.deleteTopic)

// get a topic 
router.get('/one/:id', topicController.getATopic)

// get all topic
router.get('/all', topicController.getAllTopic)


module.exports = router