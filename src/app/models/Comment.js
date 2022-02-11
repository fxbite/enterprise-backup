const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({

    userId: {type: String, required: true},
    ideaId: {type: String, required: true},
    mediaURL: {type: Array, default: []},
    content: {type: String, default: ""},
    anonymousMode: {type: Boolean, default: true},

}, {timestamps: true}
)

module.exports = mongoose.model('Comment', CommentSchema, 'comment')