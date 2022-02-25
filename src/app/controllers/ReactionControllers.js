const React = require('../models/React')

class ReactionController {

    // [POST] /react
    async createReact(req, res, next){

        try {
            const newReact = new React(req.body)
            const savedReact = newReact.save()
            res.status(200).json(savedReact)
            
        } catch (error) {
            res.status(500).json(error)
        }
    }


    // [GET] /react/:id
    async getAllReact(req, res, next){

        try {
            const ideaId = req.params.id
            const react = await React.find({})
            res.status(200).json(react)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /react/:id
    async getAReact(req, res, next){

        try {
            const react = await React.findById(req.params.id)
            res.status(200).json(react)

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new ReactionController