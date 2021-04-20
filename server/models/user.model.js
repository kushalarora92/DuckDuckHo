const mongoose = require('mongoose');
const IdentifierGenerator = require('mongoose-plugin-autoinc');

const UserModel = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hash: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { _id: false, usePushEach: true, timestamps: true });

UserModel.plugin(IdentifierGenerator.plugin, {
  model: 'User',
  startAt: 1000,
});

UserModel.index({ email: 1 });
module.exports = mongoose.model('User', UserModel);
