import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const input = [1, 2, 3];
    const result = generateLinkedList(input);

    const expected = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    expect(result).toStrictEqual(expected);

    const emptyResult = generateLinkedList([]);
    expect(emptyResult).toStrictEqual({ value: null, next: null });

    const nullInput = [null, 'test', null];
    const nullResult = generateLinkedList(nullInput);
    const nullExpected = {
      value: null,
      next: {
        value: 'test',
        next: {
          value: null,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };
    expect(nullResult).toStrictEqual(nullExpected);
  });

  test('should generate linked list from values 2', () => {
    const result1 = generateLinkedList([1, 2, 3]);
    expect(result1).toMatchSnapshot('linked-list-123');

    const result2 = generateLinkedList(['a', 42, true, null]);
    expect(result2).toMatchSnapshot('linked-list-mixed');

    const result3 = generateLinkedList([]);
    expect(result3).toMatchSnapshot('linked-list-empty');

    const largeArray = Array.from({ length: 10 }, (_, i) => i + 1);
    const result4 = generateLinkedList(largeArray);
    expect(result4).toMatchSnapshot('linked-list-large');
  });

  test('edge cases', () => {
    const singleResult = generateLinkedList(['single']);

    expect(singleResult).toStrictEqual({
      value: 'single',
      next: {
        value: null,
        next: null,
      },
    });
    expect(singleResult).toMatchSnapshot('linked-list-single');
  });
});
