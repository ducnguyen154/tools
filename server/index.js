const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const config = require('../nuxt.config.js')
const app = require('./app')

// Import and set Nuxt.js option
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  const server = app.listen(port)
  server.keepAliveTimeout = 0

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })

  server.on('clientError', (err, socket) => {
    if (err.code === 'HPE_HEADER_OVERFLOW') {
      socket.end('HTTP/1.1 431 Request Header Fields Too Large\r\n\r\n')
      return
    }
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
  })
}
start()
