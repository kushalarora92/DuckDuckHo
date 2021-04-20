const express = require('express');

const router = express.Router();

const RegisterUserController = require('../controllers/register-user.controller');
const LoginUserController = require('../controllers/login-user.controller');

router.post('/register', async (request, response) => {
  const controller = new RegisterUserController(request, response);
  await controller.executeAndHandleErrors();
});

router.post('/login', async (request, response) => {
  const controller = new LoginUserController(request, response);
  await controller.executeAndHandleErrors();
});

module.exports = router;
