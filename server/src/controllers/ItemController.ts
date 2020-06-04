import { Request, Response } from 'express';
import knex from '../database/connection';

export default class ItemController {

  static async index(request: Request, response: Response) {
    const items = await knex('items').select('*');

    function imagePath(item: any) {
      const baseUrl = `${request.protocol}://${request.headers.host}`
      return {
        title: item.title,
        image_url: `${baseUrl}/uploads/${item.image}`
      };
    };

    const serializedItems = items.map(imagePath);
    return response.json(serializedItems);
  }

}
