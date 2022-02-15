
const Submission = require('../models/Submission')

class SubmissionController {

    // [POST] /submission/create
    async createSubmission(req, res, next) {
        
        try {
            const newSubmission = new Submission(req.body)
            const savedSubmission = await newSubmission.save()
            res.status(200).json(savedSubmission)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [PUT] /submission/update/:id
    async updateSubmission(req, res, next){
        
        try {
            const id = req.params.id
            const submission = await Submission.findById(id)

            await submission.updateOne({ $set: req.body})
            const submissionUpdated = await Submission.findById(id)
            res.status(200).json({
                message: "The submission has been updated.",
                submission: submissionUpdated
            })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [DELETE] /submission/delete/:id
    async deleteSubmission(req, res, next){
        
        try {
            const submission = await Submission.findById(req.params.id)

            await submission.deleteOne()
            res.status(200).json({
                message:"The submission has been deleted."
            })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /submission/all
    async getAllSubmission(req, res, next){

        try {
            const submission = await Submission.find({})
            res.status(200).json(submission)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /submission/one/:id
    async getASubmission(req, res, next) {

        try {
            const submission = await Submission.findById(req.params.id)
            res.status(200).json(submission)

        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = new SubmissionController