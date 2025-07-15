import { BookingService } from '../booking.service';
import axios from 'axios';
import { CreateBookingDto } from 'shared';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BookingService', () => {
  let service: BookingService;
  beforeEach(() => {
    service = new BookingService();
    jest.clearAllMocks();
  });

  it('should create a booking via POST', async () => {
    const data: CreateBookingDto = { fromDate: '2024-01-01', toDate: '2024-01-02', status: 'confirmed', userId: 1, listingId: 1 };
    const responseData = { ...data, id: 1 };
    mockedAxios.post.mockResolvedValue({ data: responseData });
    const result = await service.createBooking(data);
    expect(mockedAxios.post).toHaveBeenCalledWith(expect.stringContaining('/bookings'), data);
    expect(result).toEqual(responseData);
  });

  it('should get all bookings via GET', async () => {
    const bookings = [{ id: 1 }, { id: 2 }];
    mockedAxios.get.mockResolvedValue({ data: bookings });
    const result = await service.getAllBookings();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('/bookings'));
    expect(result).toEqual(bookings);
  });
}); 