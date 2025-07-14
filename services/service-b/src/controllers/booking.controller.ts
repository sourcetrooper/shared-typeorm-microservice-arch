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
        } catch (error: unknown) {
            res.status(400).json({ message: getErrorMessage(error) });
        }
    }

    async getAllBookings(req: Request, res: Response): Promise<void> {
        try {
            const bookings = await this.bookingService.getAllBookings();
            res.status(200).json(bookings);
        } catch (error: unknown) {
            res.status(500).json({ message:getErrorMessage(error) });
        }
    }
}

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return 'Unknown error';
  }
