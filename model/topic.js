const mongoose = require('mongoose')
const Schema = mongoose.Schema

const topicschema = new Schema({
    title : String,
    description : String,
    subCategory: {type: Schema.Types.ObjectId, ref: 'subCAT'},
    category: {type: Schema.Types.ObjectId, ref: 'mainCAT'}
})
const TOPIC = mongoose.model('TOPIC', topicschema)
module.exports = TOPIC
