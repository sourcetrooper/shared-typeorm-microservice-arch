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
            const listing = await this.listingService.createListing(listingData);
            res.status(201).json(listing);
        } catch (error: any) {
            res.status(400).json({ message: error?.message || 'Error creating listing' });
        }
    }

    async getAllListings(req: Request, res: Response): Promise<void> {
        try {
            const listings = await this.listingService.getAllListings();
            res.json(listings);
        } catch (error: any) {
            res.status(500).json({ message: error?.message || 'Error fetching listings' });
        }
    }

    async getListingById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const listing = await this.listingService.getListingById(id);
            if (listing) {
                res.json(listing);
            } else {
                res.status(404).json({ message: 'Listing not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error?.message || 'Error fetching listing' });
        }
    }

    async updateListing(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const listing = await this.listingService.updateListing(id, req.body);
            if (listing) {
                res.json(listing);
            } else {
                res.status(404).json({ message: 'Listing not found' });
            }
        } catch (error: any) {
            res.status(400).json({ message: error?.message || 'Error updating listing' });
        }
    }

    async deleteListing(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const success = await this.listingService.deleteListing(id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Listing not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error?.message || 'Error deleting listing' });
        }
    }
}
