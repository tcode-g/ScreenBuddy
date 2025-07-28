const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const metricsSchema = new Schema({
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
    default: 0,
  },
  goalsCompleted: {
    type: Number,
    default: 0
  },
});

const Metrics = mongoose.model('Metrics', metricsSchema, 'metrics');
module.exports = Metrics;
