const Idea = require('../models/Idea')
const CsvParser = require("json2csv").Parser;

class DownloadController {

    // [GET] /csv/download
    async csvDownload(req, res, next) {

        try {
            const ideas = await Idea.find({})
            let csv = [];
            ideas.forEach((obj) => {
              const { id, title, description, published } = obj;
              csv.push({ _id, title, description, content, anonymousMode, published })
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
            const csvData = csvParser.parse(tutorials)
            res.setHeader("Content-Type", "text/csv")
            res.setHeader("Content-Disposition", "attachment; filename=tutorials.csv")
            res.status(200).end(csvData)
                
        } catch (error) {
            
        }
    } 
}

module.exports = new DownloadController