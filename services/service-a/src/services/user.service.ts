import { Repository } from 'typeorm';
import { User } from 'shared';
import { CreateUserDto } from 'shared';
import { AppDataSource } from '../data-source';

export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async createUser(userData: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(userData);
        return await this.userRepository.save(user);
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUserById(id: number): Promise<User | null> {
        return await this.userRepository.findOneBy({ id });
    }

    async updateUser(id: number, userData: Partial<CreateUserDto>): Promise<User | null> {
        await this.userRepository.update(id, userData);
        return await this.getUserById(id);
    }

    async deleteUser(id: number): Promise<boolean> {
        const result = await this.userRepository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
}
