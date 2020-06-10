import Knex from 'knex';
//Tipos começam com letra maiúscula

export async function up(knex: Knex){
  return knex.schema.createTable('points', table =>{
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.decimal('latitude',18,15).notNullable(),
    table.decimal('longitude',18,15).notNullable(),
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

export async function down(knex: Knex){
  return knex.schema.dropTable('point');
};