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
        } catch (error: any) {
            res.status(400).json({ message: error?.message || 'Error creating booking' });
        }
    }

    async getAllBookings(req: Request, res: Response): Promise<void> {
        try {
            const bookings = await this.bookingService.getAllBookings();
            res.json(bookings);
        } catch (error: any) {
            res.status(500).json({ message: error?.message || 'Error fetching bookings' });
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
        } catch (error: any) {
            res.status(500).json({ message: error?.message || 'Error fetching booking' });
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
        } catch (error: any) {
            res.status(400).json({ message: error?.message || 'Error updating booking' });
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
        } catch (error: any) {
            res.status(500).json({ message: error?.message || 'Error deleting booking' });
        }
    }
}
