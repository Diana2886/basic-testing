// Uncomment the code below and write your tests
import path from 'node:path';
import fs from 'node:fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const setTimeout = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 1000);
    expect(setTimeout).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const setInterval = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 1000);
    expect(setInterval).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'path/to/file.txt';
    const joinMock = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(joinMock).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'path/to/file.txt';
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });
  test('should return file content if file exists', async () => {
    const pathToFile = 'path/to/file.txt';
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    jest
      .spyOn(fs.promises, 'readFile')
      .mockResolvedValueOnce(Buffer.from('file content'));
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe('file content');
  });
});
