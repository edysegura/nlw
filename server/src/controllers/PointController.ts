import { Request, Response } from 'express';
import knex from '../database/connection';

export default class PointController {

  static async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points')
      .where('id', id)
      .first();

    if (!point) {
      return response.status(404)
        .json({ message: 'Point not found.' });
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    return response.json({
      point,
      items
    });
  }

  static async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = request.body;

    const trx = await knex.transaction();

    const [ insertedPointId ] = await trx('points').insert({
      image: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=600',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    });

    const pointItems = items.map((itemId: number) => {
      return {
        item_id: itemId,
        point_id: insertedPointId
      }
    });

    await trx('point_items').insert(pointItems);
    trx.commit();

    return response.json(request.body);
  }

}
