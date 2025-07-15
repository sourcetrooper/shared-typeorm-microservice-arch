import { ListingService } from '../listing.service';
import axios from 'axios';
import { CreateListingDto } from 'shared';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ListingService', () => {
  let service: ListingService;
  beforeEach(() => {
    service = new ListingService();
    jest.clearAllMocks();
  });

  it('should create a listing via POST', async () => {
    const data: CreateListingDto = { title: 'Test', description: 'desc', location: 'loc', pricePerNight: 100, ownerId: 1 };
    const responseData = { ...data, id: 1 };
    mockedAxios.post.mockResolvedValue({ data: responseData });
    const result = await service.createListing(data);
    expect(mockedAxios.post).toHaveBeenCalledWith(expect.stringContaining('/listings'), data);
    expect(result).toEqual(responseData);
  });

  it('should get all listings via GET', async () => {
    const listings = [{ id: 1 }, { id: 2 }];
    mockedAxios.get.mockResolvedValue({ data: listings });
    const result = await service.getAllListings();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('/listings'));
    expect(result).toEqual(listings);
  });
}); 