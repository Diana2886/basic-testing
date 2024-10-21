// Uncomment the code below and write your tests
import axios from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: {} });
    axios.create = jest.fn().mockReturnValue({ get: mockGet });

    await throttledGetDataFromApi('/test-url');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: {} });
    axios.create = jest.fn().mockReturnValue({ get: mockGet });

    const relativePath = '/posts/1';

    jest.advanceTimersByTime(THROTTLE_TIME);
    await throttledGetDataFromApi(relativePath);

    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockData = { id: 1, title: 'Test post' };
    const mockGet = jest.fn().mockResolvedValue({ data: mockData });
    axios.create = jest.fn().mockReturnValue({ get: mockGet });

    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toEqual(mockData);
  });
});
