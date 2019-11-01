const express = require('express')
const actionsRouter = require('./actions/actionsRouter')
const projecstRouter = require('./projects/projectsRouter')

const server = express();

server.use(express.json());
server.use(logger);
server.use('/actions', actionsRouter);
server.use('/projects', projecstRouter);
server.use((req, res) => {
    res.status(404).send('Aint nobody got time for that!')
  })

  server.get('/', (req, res) => {
    res.send(`<h2>First BE Sprint, here we go!</h2>`)
  });



function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin')} `)
  
    next()
  };

module.exports = server;