const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const screentimeSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  duration: {
    type: Number,
    required: true
  }
});

const ScreenTime = mongoose.model('ScreenTime', screentimeSchema, 'screenTime');
module.exports = ScreenTime;
