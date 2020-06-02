import express, { Response, Request } from 'express';

const app = express();
const PORT = process.env.PORT || 3333;

app.get('/users', (request: Request, response: Response) => {
  response.json([
    'Davi',
    'Lidy',
    'Edy'
  ]);
});

app.listen(PORT, () => {
  console.log(`The server is up and running on http://localhost:${PORT}`);
});
