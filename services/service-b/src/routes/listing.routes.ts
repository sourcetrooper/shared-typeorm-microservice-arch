import { Router } from 'express';
import { ListingController } from '../controllers/listing.controller';

const router = Router();
const listingController = new ListingController();

/**
 * @swagger
 * /listings:
 *   post:
 *     summary: Create a new listing
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateListingDto'
 *     responses:
 *       201:
 *         description: Listing created
 */
router.post('/', (req, res) => listingController.createListing(req, res));

/**
 * @swagger
 * /listings:
 *   get:
 *     summary: Get all listings
 *     responses:
 *       200:
 *         description: Returns a list of listings from Service A
 */
router.get('/', (req, res) => listingController.getAllListings(req, res));

export default router;
