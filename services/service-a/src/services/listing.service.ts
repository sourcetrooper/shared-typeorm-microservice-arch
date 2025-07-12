import { Repository } from 'typeorm';
import { Listing } from 'shared';
import { AppDataSource } from '../data-source';
import { CreateListingDto } from 'shared';

export class ListingService {
    private listingRepository: Repository<Listing>;

    constructor() {
        this.listingRepository = AppDataSource.getRepository(Listing);
    }

    async createListing(data: CreateListingDto): Promise<Listing> {
        const listing = this.listingRepository.create(data);
        return await this.listingRepository.save(listing);
    }

    async getAllListings(): Promise<Listing[]> {
        return await this.listingRepository.find({ relations: ['owner', 'bookings'] });
    }

    async getListingById(id: number): Promise<Listing | null> {
        return await this.listingRepository.findOne({ where: { id }, relations: ['owner', 'bookings'] });
    }

    async updateListing(id: number, data: Partial<Listing>): Promise<Listing | null> {
        await this.listingRepository.update(id, data);
        return await this.getListingById(id);
    }

    async deleteListing(id: number): Promise<boolean> {
        const result = await this.listingRepository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
}
