var mongoose = require('mongoose'), 
  Schema = mongoose.Schema

var MapSchema = new Schema({
  username: { type: String, required: true, unique: true },
  countries: { type: [String], required: true }
})

module.exports = mongoose.model('Map', MapSchema)