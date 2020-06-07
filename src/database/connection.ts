import knex from 'knex';
import path  from 'path';

const connection = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
});

export default connection;