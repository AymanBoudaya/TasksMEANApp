const mongoose = require('mongoose')

module.exports = mongoose.model('Work', {
    task: { type: String },
    date: { type: Date },
    document: { type: String },
    observation: { type: String },
    phase: {type:String}
},'works')