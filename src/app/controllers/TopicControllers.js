const res = require('express/lib/response')
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

    // [PUT] /topic/update/:id
    async updateTopic(req, res, next){
        
        try {
            const id = req.params.id
            const topic = await Topic.findById(id)

            await topic.updateOne({
                $set: {
                    title: req.body.title,
                    contentIdea: req.body.contentIdea,
                    expireTime: req.body.expireTime
                }
            })
            const topicUpdated = await Topic.findById(id)
            res.status(200).json({
                message: "The topic has been updated.",
                topic: topicUpdated
            })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [DELETE] /topic/delete/:id
    async deleteTopic(req, res, next){
        
        try {
            const topic = await Topic.findById(req.params.id)

            await topic.deleteOne()
            res.status(200).json({
                message:"The topic has been deleted."
            })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /topic/all
    async getAllTopic(req, res, next){

        try {
            const topic = await Topic.find({})
            res.status(200).json(topic)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /topic/one/:id
    async getATopic(req, res, next) {

        try {
            const topic = await Topic.findById(req.params.id)
            res.status(200).json(topic)

        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = new TopicController