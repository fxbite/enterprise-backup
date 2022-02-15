const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({

    file_path: {type: String, required: true},
    idea_id: {type: String, required: true},

}, {timestamps: true}
)

module.exports = mongoose.model('File', FileSchema, 'file')

