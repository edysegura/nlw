import express from 'express';
import ItemController from './controllers/ItemController';
import PointController from './controllers/PointController';

const routes = express.Router();

routes.get('/items', ItemController.index);

routes.post('/points', PointController.create);
routes.get('/points', PointController.index);
routes.get('/points/:id', PointController.show);

export default routes;
