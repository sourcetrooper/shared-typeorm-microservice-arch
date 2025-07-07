// packages/shared/src/entities/Listing.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Booking } from './Booking';

@Entity()
export class Listing {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column()
  location!: string;

  @Column('decimal')
  pricePerNight!: number;

  @ManyToOne(() => User, (user) => user.listings)
  owner!: User;

  @OneToMany(() => Booking, (booking) => booking.listing)
  bookings!: Booking[];
}