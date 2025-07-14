import { IsDateString, IsEnum, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @IsDateString()
  fromDate!: string;

  @IsDateString()
  toDate!: string;

  @IsEnum(['confirmed', 'cancelled', 'pending']) //Optional
  status?: 'confirmed' | 'cancelled' | 'pending';

  @IsNumber()
  userId!: number; // FK

  @IsNumber()
  listingId!: number; // FK
}
