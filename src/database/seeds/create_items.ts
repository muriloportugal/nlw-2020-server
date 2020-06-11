import Knex from 'knex';

export async function seed(knex: Knex) {
  // Tem que apagar point_items primeiro pois ela tem chave das outras tabelas
  await knex('point_items').delete();
  // Apaga o conteúdo de points
  await knex('points').delete();
  // Deleta todo o conteúdo de items
  await knex('items').delete();
  // Insere novamente os dados de items.
  await knex('items').insert([
    { title: 'Lâmpadas', image: 'lampadas.svg'},
    { title: 'Pilhas e Baterias', image: 'baterias.svg'},
    { title: 'Papéis e Papelão', image: 'papeis-papelao.svg'},
    { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg'},
    { title: 'Resíduos Orgânicos', image: 'organicos.svg'},
    { title: 'Óleo de Cozinha', image: 'oleo.svg'},
  ]);
};