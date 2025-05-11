import { random } from 'lodash';

import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from './';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);

    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(50);

    expect(() => {
      account.withdraw(100);
    }).toThrow(InsufficientFundsError);

    expect(() => {
      account.withdraw(100);
    }).toThrow(`Insufficient funds: cannot withdraw more than 50`);

    expect(account.getBalance()).toBe(50);
  });

  test('should throw error when transferring more than balance', () => {
    const sourceAccount = getBankAccount(50);
    const destinationAccount = getBankAccount(100);

    expect(() => {
      sourceAccount.transfer(75, destinationAccount);
    }).toThrow(InsufficientFundsError);

    expect(sourceAccount.getBalance()).toBe(50);
    expect(destinationAccount.getBalance()).toBe(100);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);

    expect(() => {
      account.transfer(50, account);
    }).toThrow(TransferFailedError);

    expect(() => {
      account.transfer(50, account);
    }).toThrow('Transfer failed');

    expect(account.getBalance()).toBe(100);
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);

    const result = account.deposit(50);

    expect(account.getBalance()).toBe(150);
    expect(result).toBe(account);

    account.deposit(25).deposit(25);
    expect(account.getBalance()).toBe(200);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);

    const result = account.withdraw(30);

    expect(account.getBalance()).toBe(70);
    expect(result).toBe(account);

    account.withdraw(20).withdraw(10);
    expect(account.getBalance()).toBe(40);
  });

  test('should transfer money', () => {
    const sourceAccount = getBankAccount(100);
    const destinationAccount = getBankAccount(50);

    const result = sourceAccount.transfer(30, destinationAccount);

    expect(sourceAccount.getBalance()).toBe(70);
    expect(destinationAccount.getBalance()).toBe(80);
    expect(result).toBe(sourceAccount);

    sourceAccount
      .transfer(20, destinationAccount)
      .transfer(10, destinationAccount);
    expect(sourceAccount.getBalance()).toBe(40);
    expect(destinationAccount.getBalance()).toBe(110);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    const expectedBalance = 75;

    (random as jest.Mock).mockImplementationOnce(() => expectedBalance);
    (random as jest.Mock).mockImplementationOnce(() => 1);

    const fetchedBalance = await account.fetchBalance();

    expect(fetchedBalance).toBe(expectedBalance);
    expect(random).toHaveBeenCalledTimes(2);

    expect(account.getBalance()).toBe(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    const newBalance = 75;

    (random as jest.Mock).mockImplementationOnce(() => newBalance);
    (random as jest.Mock).mockImplementationOnce(() => 1);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(newBalance);
    expect(random).toHaveBeenCalledTimes(2);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);

    (random as jest.Mock).mockImplementationOnce(() => 50);
    (random as jest.Mock).mockImplementationOnce(() => 0);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );

    expect(account.getBalance()).toBe(100);
    expect(random).toHaveBeenCalledTimes(2);
  });
});
