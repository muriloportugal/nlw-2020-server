"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
//Arquivo de configuração do Knex
module.exports = {
    client: 'pg',
    // Para rodar o comando knex --knexfile knexfile.ts migrate:latest localmente
    // a variável DATABASE_URL não vai existir, troque o process.env.DATABASE_URL
    // para a URL do seu banco local.
    connection: process.env.DATABASE_URL,
    // Mostra ao knex onde criamos nossas migrations
    migrations: {
        directory: path_1.default.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    seeds: {
        directory: path_1.default.resolve(__dirname, 'src', 'database', 'seeds'),
    },
    useNullAsDefault: true,
};
