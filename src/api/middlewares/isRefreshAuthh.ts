import jwt from 'express-jwt';
import config from '../../config';

/**
 * We are assuming that the JWT will come in a header with the form
 *
 * Authorization: Bearer ${JWT}
 *
 * But it could come in a query parameter with the name that you want like
 * GET https://my-bulletproof-api.com/stats?apiKey=${JWT}
 * Luckily this API follow _common sense_ ergo a _good design_ and don't allow that ugly stuff
 */

const getRefreshTokenFromBody = req => {
  console.log(req.body.oldRefreshToken);
  return req.body.oldRefreshToken ? req.body.oldRefreshToken : null;
};

const isRefreshAuth = jwt({
  secret: config.jwtRefreshSecret, // The _secret_ to sign the JWTs
  algorithms: ['HS256'], // JWT Algorithm
  userProperty: 'token', // Use req.token to store the JWT
  getToken: getRefreshTokenFromBody, // How to extract the JWT from the request
});

export default isRefreshAuth;
