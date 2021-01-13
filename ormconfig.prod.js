const devOrmConfig = require('./ormconfig')

module.exports = {
  ...devOrmConfig,
  entities: ['dist/**/**.entity.js'],
  migrations: ['dist/migrations/*.js'],
}
