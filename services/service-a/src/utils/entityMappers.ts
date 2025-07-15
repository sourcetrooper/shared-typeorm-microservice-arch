import { Booking, Listing, User } from 'shared';
import { BookingResponseDto } from 'shared/src/dtos/BookingResponseDto';
import { ListingResponseDto } from 'shared/src/dtos/ListingResponseDto';
import { UserResponseDto } from 'shared/src/dtos/UserResponseDto';

export function toBookingResponseDto(booking: Booking): BookingResponseDto {
  return {
    id: booking.id,
    fromDate: booking.fromDate,
    toDate: booking.toDate,
    status: booking.status,
    userId: booking.user.id,
    listingId: booking.listing.id,
  };
}

export function toListingResponseDto(listing: Listing): ListingResponseDto {
  return {
    id: listing.id,
    title: listing.title,
    description: listing.description,
    location: listing.location,
    pricePerNight: listing.pricePerNight,
    ownerId: listing.owner.id,
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