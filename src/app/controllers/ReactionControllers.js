const React = require('../models/React')

class ReactionController {

    // [POST] /reaction
    async createReact(req, res, next){

        try {
            const newReact = new React(req.body)
            const savedReact = newReact.save()
            res.status(200).json(savedReact)
            
        } catch (error) {
            res.status(500).json(error)
        }
    }


    // [GET] /reaction/:id
    async getAReact(req, res, next){

        try {
            const ideaId = req.params.id
            const react = await React.find({
                idea_id: ideaId
            })
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