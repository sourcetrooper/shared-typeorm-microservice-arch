// packages/shared/src/entities/Booking.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Listing } from './Listing';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  fromDate!: string;

  @Column({ type: 'date' })
  toDate!: string;

  @Column({ type: 'enum', enum: ['confirmed', 'cancelled', 'pending'], default: 'confirmed' })
  status!: 'confirmed' | 'cancelled' | 'pending';

  @ManyToOne(() => User, (user) => user.bookings)
  user!: User;

  @ManyToOne(() => Listing, (listing) => listing.bookings)
  listing!: Listing;
}