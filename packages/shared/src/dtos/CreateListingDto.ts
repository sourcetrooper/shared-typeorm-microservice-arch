import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateListingDto {
  @IsNotEmpty()
  @MinLength(3)
  title!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  location!: string;

  @IsNumber()
  pricePerNight!: number;

  @IsNumber()
  ownerId!: number; // FK (used in code to set owner relation)
}
