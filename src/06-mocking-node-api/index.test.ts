import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

import {
  doStuffByInterval,
  doStuffByTimeout,
  readFileAsynchronously,
} from './';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');

    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(setInterval).toHaveBeenCalledWith(callback, interval);
    expect(setInterval).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (join as jest.Mock).mockReset();
    (existsSync as jest.Mock).mockReset();
    (readFile as jest.Mock).mockReset();
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = 'test.txt';
    const fullPath = '/mocked/path/test.txt';

    (join as jest.Mock).mockReturnValue(fullPath);

    (existsSync as jest.Mock).mockReturnValue(false);

    await readFileAsynchronously(pathToFile);

    expect(join).toHaveBeenCalledWith(expect.any(String), pathToFile);
    expect(join).toHaveBeenCalledTimes(1);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'nonexistent.txt';
    const fullPath = '/mocked/path/nonexistent.txt';

    (join as jest.Mock).mockReturnValue(fullPath);

    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();

    expect(readFile).not.toHaveBeenCalled();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'existing.txt';
    const fullPath = '/mocked/path/existing.txt';
    const fileContent = 'This is the file content';

    (join as jest.Mock).mockReturnValue(fullPath);

    (existsSync as jest.Mock).mockReturnValue(true);

    (readFile as jest.Mock).mockResolvedValue(Buffer.from(fileContent));

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(fileContent);

    expect(readFile).toHaveBeenCalledWith(fullPath);
    expect(readFile).toHaveBeenCalledTimes(1);
  });
});
