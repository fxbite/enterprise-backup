const {Idea, File, Submission, User, Folder, Category} = require('../models')
const paginatedResults = require('../../util/paginated')
const notificationMail = require('../../util/mail')
const googleDrive = require('../../util/drive')
const stream = require('stream')
class IdeaController {

    // [POST] /idea/:id/role
    async createIdea(req, res, next){
        const session = await Submission.startSession();
        session.startTransaction();
        try {
            // Receive idea data
            const newIdea = new Idea(req.body)
            const submissionId = req.body.submission
            const arrayCategories = req.body.category
            const savedIdea = await newIdea.save({session: session})
            const ideaId = savedIdea._id

            // Tracking category tag using and update use field
            const categories = await Category.find().select('_id')
            for(const element of categories) {
                const cateId = String(element._id)
                if(_.includes(arrayCategories, cateId) === true) {
                    const category = await Category.findById(cateId)
                    if(category.use === '') {
                        await Category.findByIdAndUpdate(cateId, {use: '1'}, {session: session})
                    } else {
                        let useNumber = parseInt(category.use)
                        const updateUseNumber = useNumber + 1
                        await Category.findByIdAndUpdate(cateId, {use: updateUseNumber}, {session: session})
                    }
                }
            }

            // Receive idea file
            const fileName = req.file.originalname
            const typeFile = req.file.mimetype
            const fileObj = req.file

            // Buffer file
            const bufferStream = await new stream.PassThrough()
            const fileBuffer = await bufferStream.end(fileObj.buffer)

            // Get info of folder id Google Drive
            const folder = await Folder.findOne({submission: submissionId})
            const folderIdDrive = folder.folder_id_drive
            const folderId = folder._id

            // Upload file to Google Drive
            const uploadResult = await googleDrive.uploadFile(fileBuffer, typeFile, folderIdDrive, fileName)
            const fileId = uploadResult.id

            // Generate public URL for file
            const generateResult = await googleDrive.generatePublicUrl(fileId)
            const publicPath = generateResult.webViewLink

            // Save all info data into db
            const newFile = new File({
                file_id_drive: fileId,
                file_path: publicPath,
                idea: ideaId,
                folder: folderId
            }) 
            const savedFile = await newFile.save({session: session})
            
            // Get a name of submission
            const submission = await Submission.findById(submissionId)
            const nameTopic = submission.name

            // Send notification mail to coordinator
            const coordinatorId = '623ec63819af8a0d9cd33b6e'
            const users = await User.find({role: coordinatorId})

            for (const element of users) {
                const fullName = element.fullname
                const email = element.email
                const topic = nameTopic
                await notificationMail(fullName, email, 'coordinator', topic)
            }
            await session.commitTransaction();
            session.endSession();
            return res.redirect('/idea-management')

        } catch (error) {
            await session.abortTransaction();
            res.status(500).json(error)
        }
    }

    // [PATCH] /idea/:id
    async updateIdea(req, res, next){

        try {
            
            const id = req.params.id
            const idea = await Idea.findById(id)
    
            await idea.updateOne({
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                    content: req.body.content,
                    anonymousMode: req.body.anonymousMode,
                    category_id: req.body.category_id
                }
            })
            const updatedIdea = await Idea.findById(id)
            res.status(200).json({
                message: 'The idea has been updated.',
                idea: updatedIdea
            })

        } catch (error) {
            res.status(500).json(error)
        }

    }

    // [DELETE] /idea/:id
    async deleteIdea(req, res, next){

        try {

            // Delete a idea
            const id = req.params.id
            const idea = await Idea.findById(id)
    
            await idea.deleteOne()

            // Delete all views of idea
            await View.deleteMany({idea_id: id})

            // Delete all reaction of idea
            await React.deleteMany({idea_id: id})

            res.status(200).json({
                message: 'The idea has been deleted.',
                updated: 'All views in this idea have been deleted.'
            })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /ideas?page={}&limit={}
    async getAllIdea(req, res, next){

        try {
            const p = req.query.page
            const l = req.query.limit
            const idea = await paginatedResults(p, l, Idea)
            
            res.status(200).json(idea)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /idea/:id
    async getAIdea(req, res, next){

        try {
            const id = req.params.id
            const idea = await Idea.findById(id)
            res.status(200).json(idea)

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new IdeaController