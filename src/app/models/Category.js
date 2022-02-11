const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({

    creatorId: {type: String, required: true},
    name: {type: String, required: true},
    tag: {type: String, maxLength: 6, default: "" },

}, {timestamps: true}
)

module.exports = mongoose.model('Category', CategorySchema, 'category')