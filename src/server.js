import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

import { getConnectionMongoDB } from './db/db-connection-mongo.js';
import { mediaController } from './controllers/media.controller.js';
import { searchController } from './controllers/search.controller.js';
import { typesController } from './controllers/types.controller.js'; 

await getConnectionMongoDB();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use('/api/v1', mediaController);
app.use('/api/v1', searchController);
app.use('/api/v1', typesController); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
