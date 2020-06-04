import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const PORT = process.env.PORT || 3333;
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const uploadsLocation = path.resolve(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsLocation));

app.listen(PORT, () => {
  console.log(`The server is up and running on http://localhost:${PORT}`);
});
