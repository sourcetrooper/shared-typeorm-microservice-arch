import axios from 'axios';

export class BookingService {
    private serviceAUrl = process.env.SERVICE_A_URL || 'http://localhost:3000';

    async createBooking(data: any): Promise<any> {
        const response = await axios.post(`${this.serviceAUrl}/bookings`, data);
        return response.data;
    }

    async getAllBookings(): Promise<any[]> {
        const response = await axios.get(`${this.serviceAUrl}/bookings`);
        return response.data;
    }
}
