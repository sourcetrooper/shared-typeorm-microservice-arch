import axios from 'axios';
import { CreateBookingDto } from 'shared';
import { BookingResponseDto } from 'shared';

export class BookingService {
    private serviceAUrl = process.env.SERVICE_A_URL || 'http://localhost:3000';

    async createBooking(data: CreateBookingDto): Promise<BookingResponseDto> {
        const response = await axios.post(`${this.serviceAUrl}/bookings`, data);
        return response.data;
    }

    async getAllBookings(): Promise<BookingResponseDto[]> {
        const response = await axios.get(`${this.serviceAUrl}/bookings`);
        return response.data;
    }
}
