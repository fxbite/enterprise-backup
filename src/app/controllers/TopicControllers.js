const Topic = require('../models/Topic')

class TopicController {

    // [POST] /topic/create
    async createTopic(req, res, next) {
        
        try {
            const newTopic = new Topic(req.body)
            const savedTopic = await newTopic.save()
            res.status(200).json(savedTopic)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [PUT] /topic/:id
    async updateTopic(req, res, next){
        
        try {
            
            const topic = await Topic.findById(req.params.id)

            if (topic.managerId === req.body.managerId){
                await topic.updateOne({$set: req.body})
                res.status(200).json("The topic has been updated.")

            } else {
                res.status(403).json("You can't update this topic.")
            }

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [DELETE] /topic/:id
    async updateTopic(req, res, next){
        
        try {
            
            const topic = await Topic.findById(req.params.id)

            if (topic.managerId === req.body.managerId){
                await topic.deleteOne()
                res.status(200).json("The topic has been deleted.")

            } else {
                res.status(403).json("You can't delete this topic.")
            }

        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = new TopicController