import { renderHook, act } from '@testing-library/react';
import useLocalStorage from './use-local-storage';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('useLocalStorage', () => {
  const key = 'test-key';
  const initialValue = { name: 'test' };

  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  it('should return initial value if nothing is in local storage', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    expect(result.current[0]).toEqual(initialValue);
  });

  it('should update local storage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    const newValue = { name: 'updated' };

    act(() => {
      result.current[1](newValue);
    });

    expect(result.current[0]).toEqual(newValue);
    expect(window.localStorage.getItem(key)).toBe(JSON.stringify(newValue));
  });

  it('should retrieve value from local storage on mount', () => {
    const existingValue = { name: 'existing' };
    window.localStorage.setItem(key, JSON.stringify(existingValue));

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    // useEffect runs after mount
    expect(result.current[0]).toEqual(existingValue);
  });
});
