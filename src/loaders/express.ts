import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../api';
import config from '../config';

import http from 'http';
const socket_io = require('socket.io');
const io = socket_io();

const { errors } = require('celebrate');
export default ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Some sauce that always add since 2014
  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  // Maybe not needed anymore ?
  app.use(require('method-override')());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());
  // Load API routes
  app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    console.log(req.url);
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });
  app.use((err, req, res, next) => {
    res.status(err.status || 500);

    console.log(JSON.stringify(err));
    if (err.joi) {
      //if joi produces an error, it's likely a client-side problem
      return res.status(400).json({
        error: err.joi.message,
      });
    } else {
      res.json({
        errors: {
          message: err.message,
        },
      });
    }
  });

  /*
  const server = require('http').createServer(app);
  io.listen(server);
  const socketApi = {
    io: null,
  };
  socketApi.io = io;
  io.on('connection', function (socket) {
    console.log('connection');

    socket.on('login', function (data) {
      console.log('login');
    });
    socket.on('disconnect', function () {
      console.log('disconnect');
    });
  });
  server.io = io;

   */
  return app;
};
