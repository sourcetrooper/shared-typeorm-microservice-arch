import { Request, Response } from 'express';
import { ListingService } from '../services/listing.service';
import { CreateListingDto } from 'shared';

export class ListingController {
    private listingService: ListingService;

    constructor() {
        this.listingService = new ListingService();
    }

    async createListing(req: Request, res: Response): Promise<void> {
        try {
            const listingData: CreateListingDto = req.body;
            // Optionally, add validation here
            const listing = await this.listingService.createListing(listingData);
            res.status(201).json(listing);
        } catch (error: any) {
            res.status(400).json({ message: error?.message || 'Error creating listing' });
        }
    }

    async getAllListings(req: Request, res: Response): Promise<void> {
        try {
            const listings = await this.listingService.getAllListings();
            res.status(200).json(listings);
        } catch (error: any) {
            res.status(500).json({ message: error?.message || 'Error fetching listings' });
        }
    }
}
