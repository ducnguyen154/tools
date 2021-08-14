export default function (context) {
  if (!process.server) return

  const conf = require('../nuxt.config').buildModules
  let subDomains = []
  conf.forEach((config) => {
    if (config[0] === 'k-domains') {
      subDomains = [...config[1].subDomains]
    }
  })

  const path = context.route.path.replace(/\/([a-zA-Z0-9]+)/, '$1')
  if (subDomains.includes(path)) {
    context.redirect(`https://${path}.ducng.info`)
  }
}
