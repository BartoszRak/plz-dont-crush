module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT, 10),
  entities: ['src/**/**.entity.ts'],
  logging: Boolean(parseInt(process.env.DB_LOGGING, 10)),
  migrationsTableName: 'migration_table',
  migrations: ['src/migrations/*.ts'],
  synchronize: Boolean(parseInt(process.env.DB_SYNCHRONIZE, 10)),
  cli: {
    migrationsDir: 'src/migrations',
  },
}
