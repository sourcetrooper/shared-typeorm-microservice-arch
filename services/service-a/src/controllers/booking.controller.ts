import { Request, Response } from 'express';
import { BookingService } from '../services/booking.service';
import { CreateBookingDto } from 'shared';

export class BookingController {
    private bookingService: BookingService;

    constructor() {
        this.bookingService = new BookingService();
    }

    async createBooking(req: Request, res: Response): Promise<void> {
        try {
            const bookingData: CreateBookingDto = req.body;
            const booking = await this.bookingService.createBooking(bookingData);
            res.status(201).json(booking);
        } catch (error: unknown) {
            res.status(400).json({ message: getErrorMessage(error) });
        }
    }

    async getAllBookings(req: Request, res: Response): Promise<void> {
        try {
            const bookings = await this.bookingService.getAllBookings();
            res.json(bookings);
        } catch (error: unknown) {
            res.status(500).json({ message: getErrorMessage(error) });
        }
    }

    async getBookingById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const booking = await this.bookingService.getBookingById(id);
            if (booking) {
                res.json(booking);
            } else {
                res.status(404).json({ message: 'Booking not found' });
            }
        } catch (error: unknown) {
            res.status(500).json({ message: getErrorMessage(error) });
        }
    }

    async updateBooking(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const booking = await this.bookingService.updateBooking(id, req.body);
            if (booking) {
                res.json(booking);
            } else {
                res.status(404).json({ message: 'Booking not found' });
            }
        } catch (error: unknown) {
            res.status(400).json({ message: getErrorMessage(error) });
        }
    }

    async deleteBooking(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const success = await this.bookingService.deleteBooking(id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Booking not found' });
            }
        } catch (error: unknown) {
            res.status(500).json({ message: getErrorMessage(error) });
        }
    }
}

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return 'Unknown error';
}
