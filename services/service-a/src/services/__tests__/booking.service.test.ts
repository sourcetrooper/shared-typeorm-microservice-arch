import { BookingService } from '../booking.service';
jest.mock('typeorm');

const mockRepo = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

jest.mock('../../data-source', () => ({
  AppDataSource: {
    getRepository: () => mockRepo,
  },
}));

describe('BookingService', () => {
  let service: BookingService;
  beforeEach(() => {
    jest.clearAllMocks();
    service = new BookingService();
  });

  it('should create and save a booking', async () => {
    const data = { fromDate: '2024-01-01', toDate: '2024-01-02', status: 'confirmed', user: 1, listing: 1 };
    const booking = { ...data, id: 1 };
    mockRepo.create.mockReturnValue(booking);
    mockRepo.save.mockResolvedValue(booking);
    const result = await service.createBooking(data as any);
    expect(mockRepo.create).toHaveBeenCalledWith(data);
    expect(mockRepo.save).toHaveBeenCalledWith(booking);
    expect(result).toEqual(booking);
  });

  it('should return all bookings', async () => {
    const bookings = [{ id: 1 }, { id: 2 }];
    mockRepo.find.mockResolvedValue(bookings);
    const result = await service.getAllBookings();
    expect(result).toEqual(bookings);
  });
}); 