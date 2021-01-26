import express from 'express';

export default ({ app }: { app: express.Application }) => {
  const server = require('http').createServer(app);
  const socketApi = require('./socketApi');

  socketApi.io.attach(server);

  server.io = socketApi.io;
  return server;
};
