
const server = require('./server')


const port = 8030;
server.listen(port, () => console.log(`\n Listening on port ${port} \n`))