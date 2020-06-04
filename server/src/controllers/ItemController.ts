import { Request, Response } from 'express';
import knex from '../database/connection';

export default class ItemController {

  static async index(request: Request, response: Response) {
    const items = await knex('items').select('*');
    const baseUrl = `${request.protocol}://${request.headers.host}`;

    function imagePath(item: any) {
      return {
        id: item.id,
        title: item.title,
        image_url: `${baseUrl}/uploads/${item.image}`
      };
    };

    const serializedItems = items.map(imagePath);
    return response.json(serializedItems);
  }

}
