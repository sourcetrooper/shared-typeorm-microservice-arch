import { Router } from 'express';
import { ListingController } from '../controllers/listing.controller';

const router = Router();
const listingController = new ListingController();

// Create a new listing
router.post('/', (req, res) => listingController.createListing(req, res));

// Get all listings
router.get('/', (req, res) => listingController.getAllListings(req, res));

// Get one listing by ID
router.get('/:id', (req, res) => listingController.getListingById(req, res));

// Update a listing
router.put('/:id', (req, res) => listingController.updateListing(req, res));

// Delete a listing
router.delete('/:id', (req, res) => listingController.deleteListing(req, res));

export default router;
