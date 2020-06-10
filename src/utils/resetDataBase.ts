import knex from '../database/connection';

const resetDataBase = async () => {
  const dataAtual = new Date();
  const dataPassado = new Date(dataAtual.setMinutes(dataAtual.getMinutes()-10));
  
  try {
    // Apaga o conteúdo das tabelas points e point_items para os pontos criados a mais de 10 minutos.
    
    const points = await knex('points').where('created_at','<=',dataPassado);
    const pointIds = points.map(point => point.id);
    console.log(`${dataAtual} Apagando pontos ${pointIds}`);
    await knex('point_items').whereIn('point_id',pointIds).delete();
    await knex('points').whereIn('id',pointIds).delete();  
  } catch (error) {
    console.log(error);
  }
  
  
}

export default resetDataBase;