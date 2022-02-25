const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({

    file_id_drive: {type: String, required: true},
    file_path: {type: String, required: true},
    idea_id: {type: String, required: true},
    folder_id : {type: String, required: true}

}, {timestamps: true}
)

module.exports = mongoose.model('File', FileSchema, 'file')

