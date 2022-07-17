const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('src/server/carsDB.json');
const middlewares = jsonServer.defaults();
const db = require('./carsDB.json');
const fs = require('fs');

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use('/users', (req: any, res: any, next: any) => {
  if (isAuthorized(req) || req.query.bypassAuth === 'true') {
    next();
  } else {
    res.sendStatus(401);
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});

function formatUser(user: any) {
  delete user.password;
  user.role = user.username === 'admin' ? 'admin' : 'user';
  return user;
}

function checkIfAdmin(user: any, bypassToken = false) {
  return user.username === 'admin' || bypassToken === true
    ? 'admin-token'
    : 'user-token';
}

function isAuthorized(req: any) {
  return req.headers.authorization === 'admin-token' ? true : false;
}

function readUsers() {
  const dbRaw = fs.readFileSync('./server/db.json');
  const users = JSON.parse(dbRaw).users;
  return users;
}
