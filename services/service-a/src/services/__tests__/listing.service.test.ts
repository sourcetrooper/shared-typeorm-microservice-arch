import { ListingService } from '../listing.service';
import { CreateListingDto } from 'shared';

jest.mock('typeorm');

const mockRepo = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOneBy: jest.fn(),
};

jest.mock('../../data-source', () => ({
  AppDataSource: {
    getRepository: () => mockRepo,
  },
}));

describe('ListingService', () => {
  let service: ListingService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ListingService();
  });

  it('should create and save a listing', async () => {
    const data: CreateListingDto = { title: 'Test', description: 'desc', location: 'loc', pricePerNight: 100, ownerId: 1 };
    const listing = { ...data, id: 1 };
    mockRepo.create.mockReturnValue(listing);
    mockRepo.save.mockResolvedValue(listing);
    const result = await service.createListing(data);
    expect(mockRepo.create).toHaveBeenCalledWith(data);
    expect(mockRepo.save).toHaveBeenCalledWith(listing);
    expect(result).toEqual(listing);
  });

  it('should return all listings', async () => {
    const listings = [{ id: 1 }, { id: 2 }];
    mockRepo.find.mockResolvedValue(listings);
    const result = await service.getAllListings();
    expect(result).toEqual(listings);
  });
}); 