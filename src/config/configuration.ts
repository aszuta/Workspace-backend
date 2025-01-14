export default () => ({
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 8000,
  apiPrefix: process.env.API_PREFIX,
  database: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: +process.env.DB_PORT || 3306,
    },
  },
});
