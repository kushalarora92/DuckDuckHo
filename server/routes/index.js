const express = require('express');

const router = express.Router();
const feedDetailsRouter = require('./feed-details.route');
const userRouter = require('./user.route');

router.use('/feed-details', feedDetailsRouter);
router.use('/user', userRouter);

module.exports = router;
