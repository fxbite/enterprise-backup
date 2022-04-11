const {Schema, model} = require('mongoose')

const SubmissionSchema = new Schema({

    name: {type: String, required: true},
    description: {type: String, required: true},
    closure_date: {type: Date, required: true},
    final_closure_date: {type: Date, required: true}

}, {timestamps: true}
)

module.exports = model('Submission', SubmissionSchema, 'submission')
