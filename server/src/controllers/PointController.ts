import { Request, Response } from 'express';
import knex from '../database/connection';

export default class PointController {

  static async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const itemsId = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', itemsId)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    return response.json(points);
  }

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

    const point = {
      image: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=600',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    };

    const [ insertedPointId ] = await trx('points').insert(point);

    const pointItems = items.map((itemId: number) => {
      return {
        item_id: itemId,
        point_id: insertedPointId
      }
    });

    await trx('point_items').insert(pointItems);
    trx.commit();

    return response.json({
      id: insertedPointId,
      ... point
    });
  }

}
