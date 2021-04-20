const mongoose = require('mongoose');
const IdentifierGenerator = require('mongoose-plugin-autoinc');

const FeedDetailsModel = mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    ref: 'Users',
  },
  fedAt: {
    type: Date,
    required: true,
  },
  foodItems: [{
    type: String,
    required: true,
  }],
  ducksQty: {
    type: Number,
    required: true,
    min: 1,
  },
  totalFoodUsed: {
    type: Number,
    required: true,
    min: 1,
  },
  address: {
    addressLine1: { type: String, required: true },
    addressLine2: { type: String, required: true },
    landmark: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: Number, required: true },

  },
}, { _id: false, usePushEach: true, timestamps: true });

FeedDetailsModel.plugin(IdentifierGenerator.plugin, {
  model: 'feedDetails',
  startAt: 1000,
});

// FeedDetailsModel.index({ user: 1, productCategory: 1, isFulfilled: 1 });
module.exports = mongoose.model('feedDetails', FeedDetailsModel);
