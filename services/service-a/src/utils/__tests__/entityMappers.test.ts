import { toUserResponseDto, toListingResponseDto, toBookingResponseDto } from '../entityMappers';
import { User, Listing, Booking } from 'shared';
import { UserResponseDto } from 'shared/src/dtos/UserResponseDto';
import { ListingResponseDto } from 'shared/src/dtos/ListingResponseDto';
import { BookingResponseDto } from 'shared/src/dtos/BookingResponseDto';

describe('entityMappers', () => {
    
  describe('toUserResponseDto', () => {
    it('should map User entity to UserResponseDto', () => {
      const user: User = {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        role: 'owner',
        listings: [],
        bookings: [],
      };
      const expected: UserResponseDto = {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        role: 'owner',
      };
      const dto = toUserResponseDto(user);
      expect(dto).toEqual(expected);
    });
  });

  describe('toListingResponseDto', () => {
    it('should map Listing entity to ListingResponseDto (owner as object)', () => {
      const listing: Listing = {
        id: 2,
        title: 'Test Listing',
        description: 'desc',
        location: 'loc',
        pricePerNight: 100,
        owner: { id: 7, name: '', email: '', role: 'owner', listings: [], bookings: [] },
        bookings: [],
      };
      const expected: ListingResponseDto = {
        id: 2,
        title: 'Test Listing',
        description: 'desc',
        location: 'loc',
        pricePerNight: 100,
        ownerId: 7,
      };
      const dto = toListingResponseDto(listing);
      expect(dto).toEqual(expected);
    });
  });

  describe('toBookingResponseDto', () => {
    it('should map Booking entity to BookingResponseDto (user/listing as object, date as string)', () => {
      const booking: Booking = {
        id: 3,
        fromDate: '2024-01-01',
        toDate: '2024-01-02',
        status: 'confirmed',
        user: { id: 10, name: '', email: '', role: 'renter', listings: [], bookings: [] },
        listing: { id: 20, title: '', description: '', location: '', pricePerNight: 0, owner: { id: 1, name: '', email: '', role: 'owner', listings: [], bookings: [] }, bookings: [] },
      };
      const expected: BookingResponseDto = {
        id: 3,
        fromDate: '2024-01-01',
        toDate: '2024-01-02',
        status: 'confirmed',
        userId: 10,
        listingId: 20,
      };
      const dto = toBookingResponseDto(booking);
      expect(dto).toEqual(expected);
    });
  });
}); 