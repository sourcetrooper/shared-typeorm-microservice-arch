import { Repository } from 'typeorm';
import { Booking } from 'shared';
import { AppDataSource } from '../data-source';
import { CreateBookingDto } from 'shared';

export class BookingService {
    private bookingRepository: Repository<Booking>;

    constructor() {
        this.bookingRepository = AppDataSource.getRepository(Booking);
    }

    async createBooking(data: CreateBookingDto): Promise<Booking> {
        const booking = this.bookingRepository.create(data);
        return await this.bookingRepository.save(booking);
    }

    async getAllBookings(): Promise<Booking[]> {
        return await this.bookingRepository.find({ relations: ['user', 'listing'] });
    }

    async getBookingById(id: number): Promise<Booking | null> {
        return await this.bookingRepository.findOne({ where: { id }, relations: ['user', 'listing'] });
    }

    async updateBooking(id: number, data: Partial<Booking>): Promise<Booking | null> {
        await this.bookingRepository.update(id, data);
        return await this.getBookingById(id);
    }

    async deleteBooking(id: number): Promise<boolean> {
        const result = await this.bookingRepository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
}
