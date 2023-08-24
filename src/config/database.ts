
export default () => ({
    client: process.env.DATABASE_CLIENT || 'postgresql',
    connection: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      database: process.env.DATABASE_DBNAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD
    },
    pool: {
      min: +process.env.DATABASE_POOL_MIN || 1,
      max: +process.env.DATABASE_POOL_MAX || 5,
      idleTimeoutMillis: +process.env.DATABASE_POOL_IDLETIMEOUT || (1000 * 60 * 5),
      acquireTimeoutMillis: +process.env.DATABASE_ACQUIRE_CONNECTION_TIMEOUT || (1000 * 30),
    },
    acquireConnectionTimeout: +process.env.DATABASE_ACQUIRE_CONNECTION_TIMEOUT || 60000,
    migrations: {
      enabled: +process.env.DATABASE_MIGRATION_ENABLED === 1,
      tableName: process.env.DATABASE_MIGRATION_TABLE_NAME,
      directory: process.env.DATABASE_MIGRATION_DIRECTORY
    },
    seeds: {
      enabled: +process.env.DATABASE_SEED_ENABLED === 1,
      directory: process.env.DATABASE_SEED_DIRECTORY
    },
    searchPath: [process.env.DATABASE_DEFAULT_SCHEMA || 'public']
});
  