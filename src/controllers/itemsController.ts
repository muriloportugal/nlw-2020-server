import { Request, Response } from 'express';

import knex from '../database/connection';

class ItemsController {
  async index(request: Request, response: Response) {

    try {
      const items = await knex('items').select('*');
      const imgUrl = process.env.APP_URL + '/uploads';
      const serializedItems = items.map(item => {
        return {
          id: item.id,
          title: item.title,
          image_url: `${imgUrl}/${item.image}`,
        }
      });
    
      return response.json(serializedItems);  
    
    } catch (error) {
      
      console.log(error.message);
      return response.status(500).json({error: 'Error to get items'});

    }
    
  }
}

export default ItemsController;