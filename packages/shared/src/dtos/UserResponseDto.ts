export class UserResponseDto {
  id!: number;
  name!: string;
  email!: string;
  role!: 'owner' | 'renter';
}
