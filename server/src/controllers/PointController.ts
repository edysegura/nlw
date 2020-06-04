import { Request, Response } from 'express';
import knex from '../database/connection';

export default class PointController {

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

    await knex('points').insert({
      image: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=600',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    });

    return response.json(request.body);
  }

}
