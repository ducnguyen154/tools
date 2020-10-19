module.exports = {
  apps: [
    {
      name: 'NuxtJsSample',
      exec_mode: 'cluster',
      instance: 1,
      script: 'node ./server/index.js',
      args: '',
      watch: true,
      env: {
        "PORT": 3001,
        "NODE_ENV": 'production',
      },
      env_production: {
        "PORT": 3001,
        "NODE_ENV": 'production',
      }
    },
  ]
}

