import path from 'path';

//Arquivo de configuração do Knex

module.exports = {
  client: 'pg',
  // Para rodar o comando knex --knexfile knexfile.ts migrate:latest localmente
  // a variável DATABASE_URL não vai existir, troque o process.env.DATABASE_URL
  // para a URL do seu banco local.
  connection: process.env.DATABASE_URL || 'postgres://postgres:docker@localhost:5432/ecoleta',
  // Mostra ao knex onde criamos nossas migrations
  migrations: {
    directory: path.resolve(__dirname,'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname,'src', 'database', 'seeds'),
  },
  useNullAsDefault: true,
};