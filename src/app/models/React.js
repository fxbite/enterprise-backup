const mongoose = require('mongoose')

const ReactSchema = new mongoose.Schema({

    idea_id: {type: String, required: true},
    user_id: {type: String,  required: true},
    reaction_id: {type: String, required: true}

}, {timestamps: true}
)

module.exports = mongoose.model('React', ReactSchema, 'reaction')