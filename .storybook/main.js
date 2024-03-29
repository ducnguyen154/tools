const path = require('path')
module.exports = {
  "stories": [
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader', {
        loader: require.resolve('sass-resources-loader'),
        options: {
          // core.scss contains variables, functions, mixins..
          resources: path.resolve(__dirname, '../assets/scss/main.scss')
        }
      }],
      include: path.resolve(__dirname, '../'),
    })
    
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../')
      },
      extensions: [...config.resolve.extensions, '.js', '.vue']
    }

    // Return the altered config
    return config
  }
}
