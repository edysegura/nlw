import express, { Response, Request } from 'express';

const routes = express.Router();

routes.get('/', (request: Request, response: Response) => {
  return response.json({
    message: 'Next Level Week! Please have a seat in this rocket!'
  });
});

export default routes;