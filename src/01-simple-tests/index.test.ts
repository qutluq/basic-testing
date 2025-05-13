import { Action, simpleCalculator } from './index';

type CalculatorInput = {
  a: number;
  b: number;
  action: string;
};

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input: CalculatorInput = {
      a: 5,
      b: 3,
      action: Action.Add,
    };

    const result = simpleCalculator(input);

    expect(result).toBe(8);
  });

  test('should subtract two numbers', () => {
    const input: CalculatorInput = {
      a: 10,
      b: 4,
      action: Action.Subtract,
    };

    const result = simpleCalculator(input);

    expect(result).toBe(6);
  });

  test('should multiply two numbers', () => {
    const input: CalculatorInput = {
      a: 7,
      b: 6,
      action: Action.Multiply,
    };

    const result = simpleCalculator(input);

    expect(result).toBe(42);
  });

  test('should divide two numbers', () => {
    const input: CalculatorInput = {
      a: 20,
      b: 5,
      action: Action.Divide,
    };

    const result = simpleCalculator(input);

    expect(result).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    const input: CalculatorInput = {
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    };

    const result = simpleCalculator(input);

    expect(result).toBe(8); // 2^3 = 8
  });

  test('should return null for invalid action', () => {
    const input: CalculatorInput = {
      a: 5,
      b: 3,
      action: 'invalid_action',
    };

    const result = simpleCalculator(input);

    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: 'not a number', b: 5, action: 'add' }),
    ).toBeNull();

    expect(simpleCalculator({ a: 10, b: '7', action: 'subtract' })).toBeNull();

    expect(
      simpleCalculator({ a: 5, action: 'multiply' } as CalculatorInput),
    ).toBeNull();
    expect(
      simpleCalculator({ b: 8, action: 'divide' } as CalculatorInput),
    ).toBeNull();
    expect(simpleCalculator({ a: 2, b: 4 } as CalculatorInput)).toBeNull();
  });

  test('should handle division by zero', () => {
    const input: CalculatorInput = {
      a: 10,
      b: 0,
      action: 'divide',
    };

    const result = simpleCalculator(input);

    expect(result).toBeNull();
  });

  test('should handle negative numbers', () => {
    expect(simpleCalculator({ a: -5, b: 3, action: '+' })).toBe(-2);

    expect(simpleCalculator({ a: -8, b: -3, action: '-' })).toBe(-5);

    expect(simpleCalculator({ a: -4, b: 7, action: '*' })).toBe(-28);

    expect(simpleCalculator({ a: -20, b: 5, action: '/' })).toBe(-4);

    expect(simpleCalculator({ a: -2, b: 3, action: '^' })).toBe(-8);

    expect(simpleCalculator({ a: 4, b: -2, action: '^' })).toBe(0.0625);
  });
});
