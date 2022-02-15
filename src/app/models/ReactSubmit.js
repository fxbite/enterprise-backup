const mongoose = require('mongoose')

const ReactSubmitSchema = new mongoose.Schema({

    name: {type: String, required: true}

}, {timestamps: true}
)

module.exports = mongoose.model('ReactSubmit', ReactSubmitSchema, 'reactionSubmit')