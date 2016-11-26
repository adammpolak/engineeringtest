var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var controlSchema = new Schema ({
  name: String,
  httpVerb: String,
  httpURL: String,
  type: {type: String, enum: ["button", "slider", "select"]},
  options: [],
  value: Number,
})

controlSchema.pre('save', function(next){
  if (this.type == "button") {
    // controlSchema.add({value: {type: Boolean, default: false}});
    this.value = 0;
  } else if (this.type == "slider") {
    // controlSchema.add({value: Number})
    this.value = 0;
  } else if (this.type == "select") {
    // controlSchema.add({value: String})
    this.value = 1;
  }
  next();
});

var Control = mongoose.model('Control', controlSchema);

module.exports = Control;
