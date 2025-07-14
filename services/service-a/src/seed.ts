import { AppDataSource } from './data-source';
import { User, Listing } from 'shared';

async function seed() {
  await AppDataSource.initialize();

  const user = new User();
  user.name = 'Alice';
  user.email = 'alice@example.com';
  user.role = 'owner';

  await AppDataSource.manager.save(user);

  const listing = new Listing();
  listing.title = 'Cozy Apartment';
  listing.description = 'Near city center';
  listing.location = 'New York';
  listing.pricePerNight = 120;
  listing.owner = user;

  await AppDataSource.manager.save(listing);

  console.log('✅ Seed complete');
  process.exit(0);
}

seed();
