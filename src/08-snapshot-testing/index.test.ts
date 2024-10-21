// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const elements = [1];
    const result = generateLinkedList(elements);
    expect(result).toStrictEqual({
      value: 1,
      next: {
        value: null,
        next: null,
      },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const elements = [1, 2];
    const result = generateLinkedList(elements);
    expect(result).toMatchSnapshot();
  });
});
