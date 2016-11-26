var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Type = require('./type');

var Type_Schema = Type.schema;

var deviceSchema = new Schema ({
  name: String,
  device_type: Type_Schema,
});

var Device = mongoose.model('Device', deviceSchema);

module.exports = Device
