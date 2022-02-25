const File = require('../models/File')
const Folder = require('../models/Folder')
const googleDrive = require('../../util/drive')
const stream = require('stream')

class FileController {

    // [POST] /file/create/:id
    async createFile(req, res, next){

        try {
            const fileName = req.file.originalname
            const typeFile = req.file.mimetype
            const fileObj = req.file
            const ideaId = req.params.id 

            const bufferStream = await new stream.PassThrough()
            const fileBuffer = await bufferStream.end(fileObj.buffer)

            const folder = await Folder.find({submission_id: submissionId})
            await googleDrive.uploadFile(fileBuffer, typeFile, folderId, fileName)
            const 
            res.status(200).json('Ok')

        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = new FileController