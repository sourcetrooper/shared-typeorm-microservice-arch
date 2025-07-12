import { Request, Response } from 'express';
import { BookingService } from '../services/booking.service';

export class BookingController {
    private bookingService: BookingService;

    constructor() {
        this.bookingService = new BookingService();
    }

    async createBooking(req: Request, res: Response): Promise<void> {
        try {
            const booking = await this.bookingService.createBooking(req.body);
            res.status(201).json(booking);
        } catch (error: any) {
            res.status(400).json({ message: error?.message || 'Error creating booking' });
        }
    }

    async getAllBookings(req: Request, res: Response): Promise<void> {
        try {
            const bookings = await this.bookingService.getAllBookings();
            res.status(200).json(bookings);
        } catch (error: any) {
            res.status(500).json({ message: error?.message || 'Error fetching bookings' });
        }
    }
}
