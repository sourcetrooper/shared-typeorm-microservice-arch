import axios from 'axios';
import { CreateListingDto } from 'shared';
import { ListingResponseDto } from 'shared';

export class ListingService {
    private serviceAUrl = process.env.SERVICE_A_URL || 'http://localhost:3000';

    async createListing(data: CreateListingDto): Promise<ListingResponseDto> {
        const response = await axios.post(`${this.serviceAUrl}/listings`, data);
        return response.data;
    }

    async getAllListings(): Promise<ListingResponseDto[]> {
        const response = await axios.get(`${this.serviceAUrl}/listings`);
        return response.data;
    }
}
