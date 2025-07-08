// services/service-a/src/data-source.ts
import { DataSource } from 'typeorm';
import { User, Listing, Booking } from 'shared';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'shared_arch',
  synchronize: false,
  logging: true,
  entities: [User, Listing, Booking],
  migrations: ['./src/migrations/*.ts'],
});
