import {
  MyAwesomeError,
  rejectCustomError,
  resolveValue,
  throwCustomError,
  throwError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const testCases = [
      'string value',
      123,
      { key: 'value' },
      [1, 2, 3],
      true,
      null,
      undefined,
    ];

    for (const testValue of testCases) {
      const result = await resolveValue(testValue);
      expect(result).toBe(testValue);
    }
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMessage = 'This is a custom error message';

    expect(() => {
      throwError(errorMessage);
    }).toThrow(errorMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => {
      throwError();
    }).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => {
      throwCustomError();
    }).toThrow(MyAwesomeError);

    expect(() => {
      throwCustomError();
    }).toThrow('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
    await expect(rejectCustomError()).rejects.toThrow(
      'This is my awesome custom error!',
    );

    try {
      await rejectCustomError();
      fail('Expected rejectCustomError to throw an error');
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(MyAwesomeError);
      if (error instanceof MyAwesomeError) {
        expect(error.message).toBe('This is my awesome custom error!');
      }
    }
  });
});
