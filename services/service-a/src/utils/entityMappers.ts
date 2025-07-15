import { Booking, Listing, User } from 'shared';
import { BookingResponseDto } from 'shared/src/dtos/BookingResponseDto';
import { ListingResponseDto } from 'shared/src/dtos/ListingResponseDto';
import { UserResponseDto } from 'shared/src/dtos/UserResponseDto';

export function toBookingResponseDto(booking: Booking): BookingResponseDto {
  function toDateString(date: string | Date): string {
    return date instanceof Date ? date.toISOString() : date;
  }
  return {
    id: booking.id,
    fromDate: toDateString(booking.fromDate),
    toDate: toDateString(booking.toDate),
    status: booking.status,
    userId: typeof booking.user === 'object' ? booking.user.id : booking.user,
    listingId: typeof booking.listing === 'object' ? booking.listing.id : booking.listing,
  };
}

export function toListingResponseDto(listing: Listing): ListingResponseDto {
  return {
    id: listing.id,
    title: listing.title,
    description: listing.description,
    location: listing.location,
    pricePerNight: listing.pricePerNight,
    ownerId: typeof listing.owner === 'object' ? listing.owner.id : listing.owner,
  };
}

export function toUserResponseDto(user: User): UserResponseDto {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
} 