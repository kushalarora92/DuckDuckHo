const mongoose = require('mongoose');
const IdentifierGenerator = require('mongoose-plugin-autoinc');

const RecurringTaskModel = mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    ref: 'Users',
  },
  feedId: {
    type: Number,
    required: true,
    ref: 'feedDetails',
  },
  active: {
    type: Boolean,
    default: true,
  },
  recurrAt: {
    type: Date,
    required: true,
  },
}, { _id: false, usePushEach: true, timestamps: true });

RecurringTaskModel.index({ active: 1 });
RecurringTaskModel.plugin(IdentifierGenerator.plugin, {
  model: 'recurringTask',
  startAt: 1000,
});

module.exports = mongoose.model('recurringTask', RecurringTaskModel);
