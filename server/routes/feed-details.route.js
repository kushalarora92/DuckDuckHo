const express = require('express');

const router = express.Router();

const AddFeedDetailsController = require('../controllers/add-feed-details.controller');

router.post('/', async (request, response) => {
  const controller = new AddFeedDetailsController(request, response);
  await controller.executeAndHandleErrors();
});

module.exports = router;
