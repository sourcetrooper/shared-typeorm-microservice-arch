import axios from 'axios';
import { CreateListingDto } from 'shared';

export class ListingService {
    private serviceAUrl = process.env.SERVICE_A_URL || 'http://localhost:3000';

    async createListing(data: CreateListingDto): Promise<any> {
        const response = await axios.post(`${this.serviceAUrl}/listings`, data);
        return response.data;
    }

    async getAllListings(): Promise<any[]> {
        const response = await axios.get(`${this.serviceAUrl}/listings`);
        return response.data;
    }
}
