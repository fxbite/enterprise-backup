const Comment = require('../models/Comment')

class CommentController {

    // [POST] /comment
    async createComment(req, res, next){

        try {
            const newComment = await Comment(req.body)
            const savedComment = await newComment.save()
            res.status(200).json(savedComment)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [PATCH] /comment/:id
    async updateComment(req, res, next){

        try {
            const id = req.params.id
            const comment = await Comment.findById(id)
            
            await comment.updateOne({
                $set: {
                    content: req.body.content,
                    anonymousMode: req.body.anonymousMode
                }
            })
            
            const updateComment = await Comment.findById(id)
            res.status(200).json({
                message: 'The comment has been updated.',
                comment: updateComment
            })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [DELETE] /comment/:id
    async deleteComment(req, res, next){

        try {
            const id = req.params.id
            const comment = await Comment.findById(id)
            
            await comment.updateOne()
            res.status(200).json({
                message: 'The comment has been deleted.'
            })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /comments
    async showAllComment(req, res, next){

        try {
            const commentLevel1 = await Comment.find({replierMode: false}).sort({_id:-1})
            res.status(200).json(commentLevel1)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /comment/:id
    async showAComment(req, res, next){

        try {
            const commentReply = await Comment.findById(req.params.id)
            res.status(200).json(commentReply)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new CommentController