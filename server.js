const express = require('express');
const userRoutes= require('./users/userRouter.js');
const postRouter= require('./posts/postRouter.js');
const server = express();

server.use(express.json());
server.use(logger);
server.use('/api/users', userRoutes);
server.use('/api/posts', postRouter );
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  var d = Date(Date.now());
  var d2 = d.toString();
  console.log(`sent ${req.method} request to URL: ${req.originalUrl} at ${d2}`);
  next();
}

module.exports = server;
