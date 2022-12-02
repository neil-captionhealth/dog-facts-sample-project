/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as cors from 'cors';
import * as facts from './app/facts';

const app = express();

const corsOptions = {
  origin: ['http://localhost:4202'],
};
app.use(cors(corsOptions));

app.get('/api', (req, res) => {
  res.send({ message: 'Dog Facts API' });
});

app.get('/api/fact', facts.random);
app.get('/api/facts', facts.list);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
