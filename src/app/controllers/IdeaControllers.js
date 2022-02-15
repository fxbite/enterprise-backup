
const Idea = require('../models/Idea')
const View = require('../models/View')
const paginatedResults = require('../../util/paginated')

class IdeaController {

    // [POST] /idea/create
    async createIdea(req, res, next){

        try {
            const newIdea = new Idea(req.body)
            const savedIdea = await newIdea.save()
            res.status(200).json(savedIdea)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [PUT] /idea/update/:id
    async updateIdea(req, res, next){

        try {
            
            const id = req.params.id
            const idea = await Idea.findById(id)
    
            await idea.updateOne({
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                    content: req.body.content,
                    anonymousMode: req.body.anonymousMode,
                    category_id: req.body.category_id
                }
            })
            const updatedIdea = await Idea.findById(id)
            res.status(200).json({
                message: 'The idea has been updated.',
                idea: updatedIdea
            })

        } catch (error) {
            res.status(500).json(error)
        }

    }

    // [DELETE] /idea/delete/:id
    async deleteIdea(req, res, next){

        try {

            // Delete a idea
            const id = req.params.id
            const idea = await Idea.findById(id)
    
            await idea.deleteOne()

            // Delete all views of idea
            await View.deleteMany({idea_id: id})

            res.status(200).json({
                message: 'The idea has been deleted.',
                updated: 'All views in this idea have been deleted.'
            })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /idea?page={}&limit={}
    async getAllIdea(req, res, next){

        try {
            const p = req.query.page
            const l = req.query.limit
            const idea = await paginatedResults(p, l, Idea)
            
            res.status(200).json(idea)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /idea/one
    async getAIdea(req, res, next){

        try {
            const id = req.params.id
            const idea = await Idea.findById(id)
            res.status(200).json(idea)

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new IdeaController