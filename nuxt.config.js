/* eslint-disable nuxt/no-cjs-in-config */
module.exports = {
  telemetry: false,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'vi'
    },
    title: 'DucNgInfo',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0'
      },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  loading: {
    color: '#fff'
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/global-filters'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    [
      'k-domains',
      {
        subDomains: ['tinhluong', 'random'],
        rootDomain: ''
      }
    ],
    [
      '@nuxtjs/router',
      {
        keepDefaultRouter: true
      }
    ],
    '@nuxtjs/moment'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-analytics'
  ],
  googleAnalytics: {
    id: 'UA-71971053-2',
    dev: false
  },
  // bootstrapVue: {
  //   icons: true
  // },
  styleResources: {
    scss: ['./assets/scss/main.scss']
  },
  moment: {
    defaultLocale: ['vi'],
    locales: ['vi']
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, ctx) {
      // Run eslint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    babel: {
      compact: true,
      plugins: [
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
      ]
    }
    // plugins: [new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /vi/)]
  },

  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
  },

  router: {
    middleware: ['device', 'redirect'],
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'error',
        path: '*'
      })
    }
  }
}
