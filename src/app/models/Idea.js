const mongoose = require('mongoose')

const IdeaSchema = new mongoose.Schema({

    topicId: {type: String, required: true},
    authorId: {type: String, required: true},
    mediaURL: {type: Array, default: []},
    contentIdea: {type: String, required: true},
    category: {type: Array, required: true, default: []},
    likes: {type: Array, default: []},
    dislikes: {type: Array, default: []},
    comments: {type: Array, default: []},
    anonymousMode: {type: Boolean, default: true},
    department: {type: String, default: ""}

}, {timestamps: true}
)

module.exports = mongoose.model('Idea', IdeaSchema, 'idea')