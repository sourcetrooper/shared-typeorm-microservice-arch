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
        } catch (error: unknown) {
            res.status(400).json({ message: getErrorMessage(error) });
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        } catch (error: unknown) {
            res.status(500).json({ message: getErrorMessage(error) });
        }
    }
}

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return 'Unknown error';
}
