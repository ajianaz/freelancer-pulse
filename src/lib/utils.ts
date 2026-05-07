/**
 * Freelancer Pulse — Utility Functions
 * v0.0.1
 */

import type { Budget, Platform } from './types';
import { PLATFORM_PATTERNS } from './constants';

// ─── ID Generation ──────────────────────────────────────

/** Generate a unique ID for a job */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// ─── Budget Formatting ──────────────────────────────────

/** Format a budget for display */
export function formatBudget(budget: Budget): string {
  if (budget.min === null && budget.max === null) return budget.raw || 'Budget not specified';

  const fmt = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: budget.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  if (budget.type === 'hourly') {
    if (budget.min !== null && budget.max !== null && budget.min !== budget.max) {
      return `${fmt(budget.min)}-${fmt(budget.max)}/hr`;
    }
    if (budget.min !== null) return `${fmt(budget.min)}/hr`;
    return budget.raw;
  }

  // Fixed price
  if (budget.min !== null && budget.max !== null && budget.min !== budget.max) {
    return `${fmt(budget.min)}-${fmt(budget.max)}`;
  }
  if (budget.min !== null) return fmt(budget.min);
  return budget.raw;
}

/** Parse budget text into structured Budget */
export function parseBudget(raw: string, currency: string = 'USD'): Budget {
  if (!raw || raw.trim() === '') {
    return { raw: raw || '', min: null, max: null, currency, type: 'unknown' };
  }

  const clean = raw.replace(/,/g, '');

  // Hourly: "$50-$100/hr" or "$50/hr"
  const hourlyMatch = clean.match(/\$(\d+)\s*[-–]\s*\$(\d+)\s*\/hr/);
  if (hourlyMatch) {
    return {
      raw,
      min: parseInt(hourlyMatch[1]),
      max: parseInt(hourlyMatch[2]),
      currency,
      type: 'hourly',
    };
  }

  const singleHourlyMatch = clean.match(/\$(\d+)\s*\/hr/);
  if (singleHourlyMatch) {
    const val = parseInt(singleHourlyMatch[1]);
    return { raw, min: val, max: val, currency, type: 'hourly' };
  }

  // Fixed range: "$500-$1,000"
  const rangeMatch = clean.match(/\$(\d+)\s*[-–]\s*\$(\d+)/);
  if (rangeMatch) {
    return {
      raw,
      min: parseInt(rangeMatch[1]),
      max: parseInt(rangeMatch[2]),
      currency,
      type: 'fixed',
    };
  }

  // Single fixed: "$500"
  const singleMatch = clean.match(/\$(\d+)/);
  if (singleMatch) {
    const val = parseInt(singleMatch[1]);
    return { raw, min: val, max: val, currency, type: 'fixed' };
  }

  return { raw, min: null, max: null, currency, type: 'unknown' };
}

// ─── Date Formatting ────────────────────────────────────

/** Format a date as relative time */
export function timeAgo(iso: string): string {
  if (!iso) return '';
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  if (diffMs < 0) return 'just now';

  const mins = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);

  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ─── Text ───────────────────────────────────────────────

/** Truncate text to a max length */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

// ─── Platform Detection ─────────────────────────────────

/** Detect platform from URL */
export function detectPlatform(url: string): Platform | null {
  for (const [platform, patterns] of Object.entries(PLATFORM_PATTERNS) as [Platform, RegExp[]][]) {
    if (patterns.some((p) => p.test(url))) {
      return platform;
    }
  }
  return null;
}

/** Check if URL is a clippable job page */
export function isClippableUrl(url: string): boolean {
  return detectPlatform(url) !== null;
}
