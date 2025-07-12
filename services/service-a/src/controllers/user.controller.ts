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
            const user = await this.userService.createUser(userData);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error?.message || 'Error creating user' });
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (error: any) {
            res.status(500).json({ message: error?.message || 'Error fetching users' });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const user = await this.userService.getUserById(id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error?.message || 'Error fetching user' });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const userData = req.body;
            const user = await this.userService.updateUser(id, userData);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error: any) {
            res.status(400).json({ message: error?.message || 'Error updating user' });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const success = await this.userService.deleteUser(id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error?.message || 'Error deleting user' });
        }
    }
}
