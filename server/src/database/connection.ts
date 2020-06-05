import knex from 'knex';
import path from 'path';

const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite'),
  },
  pool: {
    afterCreate: (connection: any, callback: Function) =>
      connection.run('PRAGMA foreign_keys = ON', callback)
  },
  useNullAsDefault: true,
});

export default connection;
