const router = require('express').Router()
const topicController = require('../app/controllers/TopicControllers')

// create a topic
router.post('/create', topicController.createTopic)

// update a topic
router.put('/:id', topicController.updateTopic)

// delete a topic
// mediaURL a topic
// get a topic 


module.exports = router