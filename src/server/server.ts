const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('src/server/carsDB.json');
const middlewares = jsonServer.defaults();
const db = require('./carsDB.json');
const fs = require('fs');

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
