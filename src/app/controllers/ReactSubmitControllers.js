const ReactSubmit = require('../models/ReactSubmit')

class ReactSubmitController {

    // [POST] /react-submit
    async createNewReact(req, res, next){

        try {
            const newReact = new ReactSubmit(req.body)
            const savedReact = await newReact.save()
            res.status(200).json(savedReact)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [PUT] /react-submit/:id
    async updateReact(req, res, next){

        try {
            const reactId = req.params.id 
            const react = await ReactSubmit.findById(reactId)
            await react.updateOne({$set: req.body})

            const updatedReact = await ReactSubmit.findById(reactId)
            res.status(200).json({
                message: 'The react has been updated.',
                react: updatedReact
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [DELETE] /react-submit/:id
    async deleteReact(req, res, next){

        try {
            const react = await ReactSubmit.findById(req.params.id)
            await react.deleteOne()
            res.status(200).json({
                message: 'The react has been deleted.'
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /react-submit
    async getAllReact(req, res, next){

        try {
            const react = await ReactSubmit.find({})
            res.status(200).json(react)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /react-submit/:id
    async getAReact(req, res, next){

        try {
            const react = await ReactSubmit.findById(req.params.id)
            res.status(200).json(react)

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new ReactSubmitController