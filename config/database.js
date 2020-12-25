const _ = require('lodash')

module.exports = ({ env }) => {
  const localSettings = {
    host: env('DATABASE_HOST', '127.0.0.1'),
    srv: env.bool('DATABASE_SRV', false),
    port: env.int('DATABASE_PORT', 27017),
    database: env('DATABASE_NAME', 'chijeu'),
    username: env('DATABASE_USERNAME', null),
    password: env('DATABASE_PASSWORD', null),
  }
  
  const stagingProdSettings = {
    uri: env('DATABASE_URI'),
    database: env('DATABASE_NAME', 'chijeu')
  }

  const isLocalEnv = _.includes(_.lowerCase(env('APP_ENV')), 'local')

  const settings = isLocalEnv ? localSettings : stagingProdSettings

  return {
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'mongoose',
        settings,
        options: {
          authenticationDatabase: env('AUTHENTICATION_DATABASE', null),
          ssl: env.bool('DATABASE_SSL', false),
        },
      },
    },
  }
}
