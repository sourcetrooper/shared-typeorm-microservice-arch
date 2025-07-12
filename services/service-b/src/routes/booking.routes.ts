import { Router } from 'express';
import { BookingController } from '../controllers/booking.controller';

const router = Router();
const bookingController = new BookingController();

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings
 *     responses:
 *       200:
 *         description: Returns a list of bookings from Service A
 */
router.get('/', (req, res) => bookingController.getAllBookings(req, res));

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookingDto'
 *     responses:
 *       201:
 *         description: Booking created
 */
router.post('/', (req, res) => bookingController.createBooking(req, res));

export default router;
