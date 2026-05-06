/**
 * Freelancer Pulse — Utility Functions
 * v0.0.1
 */

import type { Budget } from './types';

/** Generate a unique ID */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/** Format a budget for display */
export function formatBudget(budget: Budget): string {
  const formatted = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: budget.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  if (budget.type === 'hourly') {
    if (budget.min === budget.max) return `${formatted(budget.min)}/hr`;
    return `${formatted(budget.min)}-${formatted(budget.max)}/hr`;
  }
  if (budget.min === budget.max) return formatted(budget.min);
  return `${formatted(budget.min)}-${formatted(budget.max)}`;
}

/** Format a date for display */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/** Calculate relative time label */
export function timeAgo(iso: string): string {
  return formatDate(iso);
}

/** Truncate text to a max length */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/** Normalize currency amount to USD (placeholder — full impl needs FX rates) */
export function normalizeToUSD(budget: Budget): Budget {
  if (budget.currency === 'USD') return budget;
  // Phase 1: no FX conversion, return as-is
  // Phase 3+: implement FX rate lookup
  return budget;
}

/** Detect platform from URL */
export function detectPlatform(url: string): 'upwork' | 'fiverr' | null {
  if (url.includes('upwork.com')) return 'upwork';
  if (url.includes('fiverr.com')) return 'fiverr';
  return null;
}
