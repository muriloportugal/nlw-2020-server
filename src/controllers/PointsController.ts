import { Request, Response, NextFunction } from 'express';
import knex from '../database/connection';

class PointsController {

  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city',String(city))
      .where('uf',String(uf))
      .distinct()
      .select('points.*');

    const imgUrl = process.env.APP_URL + '/uploads';
    const serializedPoints = points.map(point => {
      return {
        ...point,
        image_url: `${imgUrl}/${point.image}`,
      };
    });
    return response.json(serializedPoints);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id',id).first();
    if (!point) {
      return response.status(400).json({ message: 'Point no found.'});
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    const imgUrl = process.env.APP_URL + '/uploads';
    const serializedPoint = {
      ...point,
      image_url: `${imgUrl}/${point.image}`,
    };

    return response.json({ serializedPoint, items });
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;
    const whatsappString = String(whatsapp);
    
    // Transaction serve para que se der erro no 2° insert ele da um rowback no primeiro
    // Pois pela nossa regra de negócio uma depende da outra para existir
    const trx = await knex.transaction();
    
    const point = {
      image: request.file.filename,
      name,
      email,
      whatsapp: whatsappString,
      latitude,
      longitude,
      city,
      uf,
    }
    try {
      const insertedIds = await trx('points').insert(point).returning('id');
      
      const point_id = insertedIds[0];
      const pointItems = items
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) => {
          return {
            item_id,
            point_id,
          }
        });
      await trx('point_item').insert(pointItems);

      await trx.commit();
      
      return response.json({
        id: point_id,
        ...point,
      });
    } catch (error) {
      //Envia o erro para a função que lida com erros no arquivo server.ts
      return next(error);
    }
    
  }
}

export default PointsController;