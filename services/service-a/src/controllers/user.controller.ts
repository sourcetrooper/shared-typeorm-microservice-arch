import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserDto } from 'shared';
import { toUserResponseDto } from '../utils/entityMappers';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const userData: CreateUserDto = req.body;
            const user = await this.userService.createUser(userData);
            res.status(201).json(toUserResponseDto(user));
        } catch (error: unknown) {
            res.status(400).json({ message: getErrorMessage(error) });
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users.map(toUserResponseDto));
        } catch (error: unknown) {
            res.status(500).json({ message: getErrorMessage(error) });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const user = await this.userService.getUserById(id);
            if (user) {
                res.json(toUserResponseDto(user));
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error: unknown) {
            res.status(500).json({ message: getErrorMessage(error) });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const userData = req.body;
            const user = await this.userService.updateUser(id, userData);
            if (user) {
                res.json(toUserResponseDto(user));
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error: unknown) {
            res.status(400).json({ message: getErrorMessage(error) });
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
        } catch (error: unknown) {
            res.status(500).json({ message: getErrorMessage(error) });
        }
    }
}

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return 'Unknown error';
}
