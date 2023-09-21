const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subschema = new Schema({
    name : String,
    category :{type: Schema.Types.ObjectId, ref: 'mainCAT'}
})
const SUB = mongoose.model('subCAT', subschema)
module.exports = SUB