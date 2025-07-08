// services/service-a/src/index.ts
import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (_req: Request, res: Response) => {
  res.send('OK');
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
