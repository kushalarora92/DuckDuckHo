const express = require('express');

const router = express.Router();
const feedDetailsRoute = require('./feed-details.route');

router.use('/feed-details', feedDetailsRoute);

module.exports = router;
