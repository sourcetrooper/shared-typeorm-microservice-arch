import { UserService } from '../user.service';
jest.mock('typeorm');

const mockRepo = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

jest.mock('../../data-source', () => ({
  AppDataSource: {
    getRepository: () => mockRepo,
  },
}));

describe('UserService', () => {
  let service: UserService;
  beforeEach(() => {
    jest.clearAllMocks();
    service = new UserService();
  });

  it('should create and save a user', async () => {
    const data = { name: 'Test', email: 'test@test.com', role: 'owner' };
    const user = { ...data, id: 1 };
    mockRepo.create.mockReturnValue(user);
    mockRepo.save.mockResolvedValue(user);
    const result = await service.createUser(data as any);
    expect(mockRepo.create).toHaveBeenCalledWith(data);
    expect(mockRepo.save).toHaveBeenCalledWith(user);
    expect(result).toEqual(user);
  });

  it('should return all users', async () => {
    const users = [{ id: 1 }, { id: 2 }];
    mockRepo.find.mockResolvedValue(users);
    const result = await service.getAllUsers();
    expect(result).toEqual(users);
  });
}); 