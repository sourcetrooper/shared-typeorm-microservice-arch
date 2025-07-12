import axios from 'axios';
import { CreateUserDto } from 'shared';

export class UserService {
    private serviceAUrl = process.env.SERVICE_A_URL || 'http://localhost:3000';

    async createUser(data: CreateUserDto): Promise<any> {
        const response = await axios.post(`${this.serviceAUrl}/users`, data);
        return response.data;
    }

    async getAllUsers(): Promise<any[]> {
        const response = await axios.get(`${this.serviceAUrl}/users`);
        return response.data;
    }
}
