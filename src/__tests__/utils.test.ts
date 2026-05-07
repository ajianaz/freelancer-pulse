import { describe, it, expect } from 'vitest';
import { generateId, parseBudget, formatBudget, timeAgo, truncate, detectPlatform, isClippableUrl } from '$lib/utils';

describe('Utils — generateId', () => {
  it('generates unique IDs', () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()));
    expect(ids.size).toBe(100);
  });

  it('returns a string with expected format', () => {
    const id = generateId();
    expect(id).toMatch(/^\d+-[a-z0-9]+$/);
  });
});

describe('Utils — parseBudget', () => {
  it('parses fixed range "$500-$1,000"', () => {
    const budget = parseBudget('$500-$1,000');
    expect(budget.min).toBe(500);
    expect(budget.max).toBe(1000);
    expect(budget.type).toBe('fixed');
  });

  it('parses hourly range "$50-$100/hr"', () => {
    const budget = parseBudget('$50-$100/hr');
    expect(budget.min).toBe(50);
    expect(budget.max).toBe(100);
    expect(budget.type).toBe('hourly');
  });

  it('parses single hourly "$75/hr"', () => {
    const budget = parseBudget('$75/hr');
    expect(budget.min).toBe(75);
    expect(budget.max).toBe(75);
    expect(budget.type).toBe('hourly');
  });

  it('parses single fixed "$500"', () => {
    const budget = parseBudget('$500');
    expect(budget.min).toBe(500);
    expect(budget.max).toBe(500);
    expect(budget.type).toBe('fixed');
  });

  it('handles empty string', () => {
    const budget = parseBudget('');
    expect(budget.type).toBe('unknown');
    expect(budget.min).toBeNull();
  });

  it('handles unparseable text', () => {
    const budget = parseBudget('Not specified');
    expect(budget.type).toBe('unknown');
  });
});

describe('Utils — formatBudget', () => {
  it('formats fixed range', () => {
    const budget = parseBudget('$500-$1,000');
    expect(formatBudget(budget)).toBe('$500-$1,000');
  });

  it('formats hourly', () => {
    const budget = parseBudget('$50-$100/hr');
    expect(formatBudget(budget)).toBe('$50-$100/hr');
  });

  it('formats single fixed', () => {
    const budget = parseBudget('$500');
    expect(formatBudget(budget)).toBe('$500');
  });

  it('handles unknown budget', () => {
    const budget = parseBudget('Not specified');
    expect(formatBudget(budget)).toBe('Not specified');
  });
});

describe('Utils — timeAgo', () => {
  it('returns "just now" for recent timestamps', () => {
    expect(timeAgo(new Date().toISOString())).toBe('just now');
  });

  it('returns minutes ago', () => {
    const fiveMinAgo = new Date(Date.now() - 5 * 60000).toISOString();
    expect(timeAgo(fiveMinAgo)).toBe('5m ago');
  });

  it('returns hours ago', () => {
    const threeHoursAgo = new Date(Date.now() - 3 * 3600000).toISOString();
    expect(timeAgo(threeHoursAgo)).toBe('3h ago');
  });

  it('returns days ago', () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString();
    expect(timeAgo(twoDaysAgo)).toBe('2d ago');
  });

  it('returns empty for empty string', () => {
    expect(timeAgo('')).toBe('');
  });
});

describe('Utils — truncate', () => {
  it('keeps short text as-is', () => {
    expect(truncate('hello', 10)).toBe('hello');
  });

  it('truncates long text', () => {
    expect(truncate('hello world foo bar', 14)).toBe('hello world...');
  });
});

describe('Utils — detectPlatform', () => {
  it('detects Upwork job page', () => {
    expect(detectPlatform('https://www.upwork.com/jobs/~0123abc')).toBe('upwork');
  });

  it('detects Upwork search page', () => {
    expect(detectPlatform('https://www.upwork.com/nx/search/jobs/?q=react')).toBe('upwork');
  });

  it('detects Fiverr search page', () => {
    expect(detectPlatform('https://www.fiverr.com/search/gigs?query=logo')).toBe('fiverr');
  });

  it('returns null for unsupported URLs', () => {
    expect(detectPlatform('https://www.google.com')).toBeNull();
  });
});

describe('Utils — isClippableUrl', () => {
  it('returns true for Upwork', () => {
    expect(isClippableUrl('https://www.upwork.com/jobs/~0123')).toBe(true);
  });

  it('returns false for google.com', () => {
    expect(isClippableUrl('https://www.google.com')).toBe(false);
  });
});
