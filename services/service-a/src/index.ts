// services/service-a/src/index.ts
import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import { Request, Response } from 'express';
import userRoutes from './routes/user.routes';
import listingRoutes from './routes/listing.routes';
import bookingRoutes from './routes/booking.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', userRoutes);
app.use('/listings', listingRoutes);
app.use('/bookings', bookingRoutes);

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
