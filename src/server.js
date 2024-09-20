import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

import { getConnectionMongoDB } from './db/db-connection-mongo.js';
import { mediaController } from './controllers/media.controller.js';
import { searchController } from './controllers/search.controller.js';
import { typesController } from './controllers/types.controller.js';
import { producersController } from './controllers/producers.controller.js';
import { directorsController } from './controllers/directors.controller.js';
import { genresController } from './controllers/genre.controller.js';

await getConnectionMongoDB();
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());
app.use('/api/v1', mediaController);
app.use('/api/v1', searchController);
app.use('/api/v1', typesController);
app.use('/api/v1', producersController);
app.use('/api/v1', directorsController);
app.use('/api/v1', genresController);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
