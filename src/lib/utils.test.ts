import { describe, it, expect } from 'vitest';
import {
  cn,
  formatDate,
  nFormatter,
  capitalize,
  truncate,
  formatCount,
  formatRelativeTime,
} from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('merges tailwind classes correctly', () => {
      expect(cn('px-2', 'py-2')).toBe('px-2 py-2');
      expect(cn('px-2', 'px-4')).toBe('px-4'); // tailwind-merge in action
    });
  });

  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = '2024-01-01';
      expect(formatDate(date)).toBe('January 1, 2024');
    });
  });

  describe('nFormatter', () => {
    it('formats numbers correctly', () => {
      expect(nFormatter(1000)).toBe('1K');
      expect(nFormatter(1000000)).toBe('1M');
      expect(nFormatter(1200, 1)).toBe('1.2K');
      expect(nFormatter(0)).toBe('0');
    });
  });

  describe('capitalize', () => {
    it('capitalizes the first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
      expect(capitalize('')).toBe('');
    });
  });

  describe('truncate', () => {
    it('truncates strings correctly', () => {
      expect(truncate('hello world', 5)).toBe('hello...');
      expect(truncate('hello', 10)).toBe('hello');
    });
  });

  describe('formatCount', () => {
    it('formats counts correctly', () => {
      expect(formatCount(1200)).toBe('1.2K');
      expect(formatCount(1000000)).toBe('1M');
    });
  });

  describe('formatRelativeTime', () => {
    it('formats relative time correctly for English', () => {
      const now = new Date();
      const tenSecondsAgo = new Date(now.getTime() - 10 * 1000);
      expect(formatRelativeTime(tenSecondsAgo)).toBe('10s');

      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
      expect(formatRelativeTime(fiveMinutesAgo)).toBe('5m');
    });

    it('formats relative time correctly for Chinese', () => {
      const now = new Date();
      const tenSecondsAgo = new Date(now.getTime() - 10 * 1000);
      expect(formatRelativeTime(tenSecondsAgo, 'zh')).toBe('10秒前');
    });
  });
});
