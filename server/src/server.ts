import express from 'express';

const app = express();

app.get('/users', (request, response) => {
  response.send('Hello World');
});

app.listen(3333);
