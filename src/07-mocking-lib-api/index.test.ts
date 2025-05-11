import axios from 'axios';

import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: 'test data' });
    const mockCreate = jest.fn().mockReturnValue({ get: mockGet });
    axios.create = mockCreate;

    await throttledGetDataFromApi('/test-path');

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: 'test data' });
    axios.create = jest.fn().mockReturnValue({ get: mockGet });

    const testPath = '/users/1';

    await throttledGetDataFromApi(testPath);

    expect(mockGet).toHaveBeenCalledWith(testPath);
  });

  test('should return response data', async () => {
    const testData = { id: 1, name: 'Test User' };

    const mockGet = jest.fn().mockResolvedValue({ data: testData });
    axios.create = jest.fn().mockReturnValue({ get: mockGet });

    const result = await throttledGetDataFromApi('/users/1');

    expect(result).toEqual(testData);
  });
});
