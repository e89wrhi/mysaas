import { describe, it, expect } from 'vitest';
import { RequiresProPlanError } from './exceptions';

describe('Exceptions', () => {
  it('RequiresProPlanError should have correct name and message', () => {
    const error = new RequiresProPlanError();
    expect(error.message).toBe('This action requires a pro plan');
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(RequiresProPlanError);
  });

  it('RequiresProPlanError should allow custom message', () => {
    const error = new RequiresProPlanError('Custom error message');
    expect(error.message).toBe('Custom error message');
  });
});
