const mongoose = require('mongoose')

const IconSchema = new mongoose.Schema({

    name: {type: String, required: true}

}, {timestamps: true}
)

module.exports = mongoose.model('Icon', IconSchema, 'icon')