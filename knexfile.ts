// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: `${__dirname}/.env` });
import KnexConfig from './src/config/configuration';
const config = KnexConfig();
module.exports = {
  ...KnexConfig,
  client: config.database.client,
  connection: {
    ...config.database.connection,
    nestTables: false,
  },
  postProcessResponse: (result) => result,
};
