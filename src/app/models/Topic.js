const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema({

    managerId: {type: String, required: true },
    title: {type: String, default: ""},
    mediaURL: {type: Array, default: []},
    contentIdea: {type: String, default: ""},
    expireTime: {type: Date, required: true},

}, {timestamps: true}
)

module.exports = mongoose.model('Topic', TopicSchema, 'topic')