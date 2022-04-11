const {Schema, model} = require('mongoose')

const FolderSchema = new Schema({

    folder_id_drive: {type: String, required: true},
    folder_path: {type: String, required: true},
    submission: {type: Schema.Types.ObjectId, required: true, ref: 'Submission'}

}, {timestamps: true}
)

module.exports = model('Folder', FolderSchema, 'folder')
