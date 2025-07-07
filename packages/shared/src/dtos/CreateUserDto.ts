import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2)
  name!: string;

  @IsEmail()
  email!: string;

  @IsEnum(['owner', 'renter'])
  role!: 'owner' | 'renter';
}
