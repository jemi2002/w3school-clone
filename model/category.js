const mongoose = require('mongoose')
const Schema = mongoose.Schema

const catschema = new Schema({
    name : String,
    colorcode : String,
    tagline : String
})
const MAIN = mongoose.model('mainCAT', catschema)
module.exports = MAIN
