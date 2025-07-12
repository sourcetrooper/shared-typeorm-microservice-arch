import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

// Create a new user
router.post('/', (req, res) => userController.createUser(req, res));

// Get all users
router.get('/', (req, res) => userController.getAllUsers(req, res));

// Get one user by ID
router.get('/:id', (req, res) => userController.getUserById(req, res));

// Update a user
router.put('/:id', (req, res) => userController.updateUser(req, res));

// Delete a user
router.delete('/:id', (req, res) => userController.deleteUser(req, res));

export default router;
