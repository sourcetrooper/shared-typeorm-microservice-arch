import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserDto } from 'shared';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const userData: CreateUserDto = req.body;
            // Optionally, add validation here
            const user = await this.userService.createUser(userData);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error?.message || 'Error creating user' });
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        console.log('🎯 getAllUsers controller method called');
        try {
            const users = await this.userService.getAllUsers();
            console.log('📤 Sending users response:', users);
            res.status(200).json(users);
        } catch (error: any) {
            console.error('💥 Error in getAllUsers controller:', error.message);
            res.status(500).json({ message: error?.message || 'Error fetching users' });
        }
    }
}
