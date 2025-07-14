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
        } catch (error: unknown) {
            res.status(400).json({ message: getErrorMessage(error) });
        }
    }

    async getAllListings(req: Request, res: Response): Promise<void> {
        try {
            const listings = await this.listingService.getAllListings();
            res.json(listings);
        } catch (error: unknown) {
            res.status(500).json({ message: getErrorMessage(error) });
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
        } catch (error: unknown) {
            res.status(500).json({ message: getErrorMessage(error) });
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
        } catch (error: unknown) {
            res.status(400).json({ message: getErrorMessage(error) });
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
        } catch (error: unknown) {
            res.status(500).json({ message: getErrorMessage(error) });
        }
    }
}

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return 'Unknown error';
}
