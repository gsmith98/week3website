var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
  Name:{
    type: String,
    required: true,
    unique: true
  },
  Message: {
    type: String,
    required: true
  }
});

var messagemodel =  mongoose.model('Message', MessageSchema);
var a = 1;

module.exports = {
  Message: messagemodel,
  A: a
};
