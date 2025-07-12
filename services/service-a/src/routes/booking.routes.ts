import { Router } from 'express';
import { BookingController } from '../controllers/booking.controller';

const router = Router();
const bookingController = new BookingController();

// Create a new booking
router.post('/', (req, res) => bookingController.createBooking(req, res));

// Get all bookings
router.get('/', (req, res) => bookingController.getAllBookings(req, res));

// Get one booking by ID
router.get('/:id', (req, res) => bookingController.getBookingById(req, res));

// Update a booking
router.put('/:id', (req, res) => bookingController.updateBooking(req, res));

// Delete a booking
router.delete('/:id', (req, res) => bookingController.deleteBooking(req, res));

export default router;
