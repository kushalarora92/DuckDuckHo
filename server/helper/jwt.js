const expressJwt = require('express-jwt');
const config = require('../../config/config.json');
const UserRepo = require('../repositories/user.repo');

// eslint-disable-next-line consistent-return
async function isRevoked(req, payload, done) {
  const user = await new UserRepo().getById(payload.sub);
  // revoke token if user no longer exists
  if (!user || !user.active) {
    return done(null, true);
  }

  req.authenticatedUser = user;
  done();
}

function jwt() {
  const { secret } = config;
  return expressJwt({ secret, isRevoked, algorithms: ['HS256'] }).unless({
    path: [
      // public routes that don't require authentication
      '/api/user/login',
      '/api/user/register',
    ],
  });
}

module.exports = jwt;
