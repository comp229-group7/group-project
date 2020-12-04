let mongoose = require('mongoose');

// create a model class
let Survey = mongoose.Schema({
  first: String,
  last: String,
  gender: String,
  age: String,
  question1: String,
  question2: String,
  question3: String,
  question4: String,
  question5: String,
  createdbyuser: String//Added
},
{
  collection: "surveys"
});

module.exports = mongoose.model('Survey', Survey);