const Idea = require('../models/Idea')
const Submission = require('../models/Submission')
const Category = require('../models/Category')
const User = require('../models/User')
const CsvParser = require("json2csv").Parser;

class DownloadController {

    // [GET] /csv/download
    async csvDownload(req, res, next) {

        try {
            const ideas = await Idea.find({})
            let csv = [];
            ideas.forEach(async(obj) => {

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
                  id: obj._id,
                  title: obj.title,
                  description: obj.description,
                  content: obj.content,
                  anonymousMode: obj.anonymousMode,
                  email: email,
                  fullName: fullName,
                  topic: submitName,
                  category: categoryName,
                  totalViews: obj.total_view,
                  totalReaction: obj.total_reaction
              };
              
              csv.push(dataExported)
            });
            const csvFields = [
                'Id', 
                'Title', 
                'Description', 
                'Content', 
                'Anonymous Mode', 
                'Email', 
                'Full Name', 
                'Topic',
                'Category',
                'Total Views', 
                'Total Reaction']
                
            const csvParser = new CsvParser({ csvFields })
            const csvData = csvParser.parse(csv)
            res.setHeader("Content-Type", "text/csv")
            res.setHeader("Content-Disposition", "attachment; filename=tutorials.csv")
            res.status(200).end(csvData)
                
        } catch (error) {
            res.status(500).json(error)
        }
    } 
}

module.exports = new DownloadController