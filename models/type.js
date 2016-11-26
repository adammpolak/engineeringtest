var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Control = require('./control');

var Control_Schema = Control.schema;

var typeSchema = new Schema ({
  name: String,
  api: String,
  controls: [Control_Schema],
})

var Type = mongoose.model('Type', typeSchema);

module.exports = Type;
