import { createLazyInvocationCounter } from '../test/lazy_invocation_counter';
import { pipe } from './pipe';
import { take } from './take';
import { uniq } from './uniq';

it('uniq', () => {
  expect(uniq([1, 2, 2, 5, 1, 6, 7] as const)).toEqual([1, 2, 5, 6, 7]);
});

describe('pipe', () => {
  it('uniq', () => {
    const counter = createLazyInvocationCounter();
    const result = pipe(
      [1, 2, 2, 5, 1, 6, 7] as const,
      counter.fn(),
      uniq(),
      take(3)
    );
    expect(counter.count).toHaveBeenCalledTimes(4);
    expect(result).toEqual([1, 2, 5]);
  });

  it('take before uniq', () => {
    // bug from https://github.com/remeda/remeda/issues/14
    const counter = createLazyInvocationCounter();
    const result = pipe(
      [1, 2, 2, 5, 1, 6, 7] as const,
      counter.fn(),
      take(3),
      uniq()
    );
    expect(counter.count).toHaveBeenCalledTimes(3);
    expect(result).toEqual([1, 2]);
  });
});
