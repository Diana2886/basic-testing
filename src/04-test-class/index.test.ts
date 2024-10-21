// Uncomment the code below and write your tests
import { getBankAccount } from '.';

const balance = 100;
const account = getBankAccount(balance);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(200)).toThrow(
      `Insufficient funds: cannot withdraw more than ${balance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(200, getBankAccount(50))).toThrow(
      `Insufficient funds: cannot withdraw more than ${balance}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(50, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    expect(account.deposit(50).getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    expect(account.withdraw(50).getBalance()).toBe(100);
  });

  test('should transfer money', () => {
    expect(account.transfer(50, getBankAccount(50)).getBalance()).toBe(50);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(40);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(40);
    await account.synchronizeBalance();
    expect(await account.getBalance()).toBe(40);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
