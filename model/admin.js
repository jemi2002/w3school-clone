const mongoose = require('mongoose')
const Schema = mongoose.Schema

const topicschema = new Schema({
    username : String,
    email : {
        type : String,
        unique: true,
    },
    password : String
})

const ADMIN = mongoose.model('admin', topicschema)
module.exports = ADMIN