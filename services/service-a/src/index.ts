// services/service-a/src/index.ts
import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import { Request, Response } from 'express';
import { Listing } from 'shared';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (_req: Request, res: Response) => {
  res.send('OK');
});

app.get('/listings', async (_req, res) => {
  const listings = await AppDataSource.getRepository(Listing).find({
    relations: ['owner'],
  });
  res.json(listings);
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.listen(PORT, () => {
      console.log(`🚀 Service A running at http://localhost:${PORT}`);
    });
  })
  .catch((err: unknown) => {
    console.error('Error during Data Source initialization:', err);
  });
