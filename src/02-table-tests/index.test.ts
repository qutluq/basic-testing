import { Action, simpleCalculator } from './index';

type TestCase = {
  a?: number | string;
  b?: number | string;
  action?: Action | string;
  expected: number | null;
  description: string;
};

const testCases: TestCase[] = [
  {
    a: 5,
    b: 3,
    action: Action.Add,
    expected: 8,
    description: 'should add two numbers',
  },
  {
    a: 10,
    b: 4,
    action: Action.Subtract,
    expected: 6,
    description: 'should subtract two numbers',
  },
  {
    a: 7,
    b: 6,
    action: Action.Multiply,
    expected: 42,
    description: 'should multiply two numbers',
  },
  {
    a: 20,
    b: 5,
    action: Action.Divide,
    expected: 4,
    description: 'should divide two numbers',
  },
  {
    a: 2,
    b: 3,
    action: Action.Exponentiate,
    expected: 8,
    description: 'should exponentiate two numbers',
  },
  {
    a: 5,
    b: 3,
    action: 'invalid_action',
    expected: null,
    description: 'should return null for invalid action',
  },
  {
    a: 10,
    b: 0,
    action: 'divide',
    expected: null,
    description: 'should handle division by zero',
  },

  {
    a: -5,
    b: 3,
    action: '+',
    expected: -2,
    description: 'should add with first negative number',
  },
  {
    a: -8,
    b: -3,
    action: '-',
    expected: -5,
    description: 'should subtract with both negative numbers',
  },
  {
    a: -4,
    b: 7,
    action: '*',
    expected: -28,
    description: 'should multiply with first negative number',
  },
  {
    a: -20,
    b: 5,
    action: '/',
    expected: -4,
    description: 'should divide with negative dividend',
  },
  {
    a: -2,
    b: 3,
    action: '^',
    expected: -8,
    description: 'should exponentiate with negative base and odd exponent',
  },
  {
    a: 4,
    b: -2,
    action: '^',
    expected: 0.0625,
    description: 'should exponentiate with negative exponent',
  },
  {
    a: 'not a number',
    b: 5,
    action: 'add',

    description: 'non-numeric first argument',
    expected: null,
  },
  {
    a: 10,
    b: '7',
    action: 'subtract',
    description: 'non-numeric second argument',
    expected: null,
  },
  {
    a: 5,
    action: 'multiply',
    description: 'missing second argument',
    expected: null,
  },
  {
    b: 8,
    action: 'divide',
    description: 'missing first argument',
    expected: null,
  },
  { a: 2, b: 4, description: 'missing action', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    '$description: a=$a, b=$b, action=$action → $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
