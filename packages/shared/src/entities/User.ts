// packages/shared/src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Listing } from './Listing';
import { Booking } from './Booking';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: ['owner', 'renter'], default: 'renter' })
  role: 'owner' | 'renter';

  @OneToMany(() => Listing, (listing) => listing.owner)
  listings: Listing[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}