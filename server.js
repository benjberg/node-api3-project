const express = require('express');

const server = express();
server.use(logger);
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  var d = Date(Date.now());
  var d2 = d.toString();
  console.log(`sent ${req.method} request to ${req.originalUrl} at ${d2}`);
  next();
}

module.exports = server;
