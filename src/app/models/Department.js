const mongoose = require('mongoose')

const DepartmentSchema = new mongoose.Schema({

    name: {type: String, required: true},
    abbreviation: {type: String, default: ""},

}, {timestamps: true}
)

module.exports = mongoose.model('Department', DepartmentSchema, 'department')