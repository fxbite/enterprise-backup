const Idea = require('../models/Idea')
const Submission = require('../models/Submission')
const Category = require('../models/Category')
const User = require('../models/User')
const exportCSV = require('../../util/exportCSV')
const {parse, Parser} = require('json2csv')

class DownloadController {

    // [GET] /csv/download
    async csvDownload(req, res, next) {

        try {
            const ideas = await Idea.find()
                .populate('user')
                .populate('submission')
                .populate('category')

            let csv = [];
            ideas.forEach((obj) => {

                // Get id
                const userId = obj.user_id
                const submissionId = obj.submission_id
                const categoryId = obj.category_id

                // Find info 
                const userInfo = await User.findById(userId)
                const email = userInfo.email
                const fullName = userInfo.fullname
                const submissionInfo = await Submission.findById(submissionId)
                const submitName = submissionInfo.name
                const categoryInfo = await Category.findById(categoryId)
                const categoryName = categoryInfo.name

                const dataExported = {
                  ideaId: obj._id,
                  ideaTitle: obj.title,
                  ideaDescription: obj.description,
                  content: obj.content,
                  email: email,
                  role: ,
                  category: categoryName,
                  department: ,
                  title: ,
                  description: ,
                  closure_date: ,
                  final_closure_date: ,
                  totalViews: obj.total_view,
              };
              
              csv.push(dataExported)
            });

            const csvFields = [
                {
                    label: 'Idea ID',
                    value: 'ideaId',
                    default: ''
                },
                {
                    label: 'Idea Title',
                    value: 'title',
                    default: ''
                },
                {
                    label: 'Idea Description',
                    value: 'ideaDescription',
                    default: ''
                },
                {
                    label: 'Idea Content',
                    value: 'content',
                    default: ''
                },
                {
                    label: 'Email',
                    value: 'email',
                    default: ''
                },
                {
                    label: 'Full Name',
                    value: 'fullname',
                    default: ''
                },
                {
                    label: 'Role',
                    value: '',
                    default: ''
                },
                {
                    label: 'Category',
                    value: '',
                    default: ''
                },
                {
                    label: 'Department',
                    value: '',
                    default: ''
                },
                {
                    label: 'Submission Title',
                    value: '',
                    default: ''
                },
                {
                    label: 'Submission Description',
                    value: '',
                    default: ''
                },
                {
                    label: 'Closure Date',
                    value: '',
                    default: ''
                },
                {
                    label: 'Final Closure Date',
                    value: '',
                    default: ''
                },
                {
                    label: 'Total View',
                    value: '',
                    default: ''
                }
            ]
                
            exportCSV(res, {
                header: csvFields,
                data: csv
            })
            res.end()
        } catch (error) {
            res.status(500).json(error)
        }
    } 
}

module.exports = new DownloadController