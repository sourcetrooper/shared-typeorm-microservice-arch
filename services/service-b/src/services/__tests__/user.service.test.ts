import { UserService } from '../user.service';
import axios from 'axios';
import { CreateUserDto } from 'shared';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('UserService', () => {
  let service: UserService;
  beforeEach(() => {
    service = new UserService();
    jest.clearAllMocks();
  });

  it('should create a user via POST', async () => {
    const data: CreateUserDto = { name: 'Test', email: 'test@test.com', role: 'owner' };
    const responseData = { ...data, id: 1 };
    mockedAxios.post.mockResolvedValue({ data: responseData });
    const result = await service.createUser(data);
    expect(mockedAxios.post).toHaveBeenCalledWith(expect.stringContaining('/users'), data);
    expect(result).toEqual(responseData);
  });

  it('should get all users via GET', async () => {
    const users = [{ id: 1 }, { id: 2 }];
    mockedAxios.get.mockResolvedValue({ data: users });
    const result = await service.getAllUsers();
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('/users'));
    expect(result).toEqual(users);
  });
}); 