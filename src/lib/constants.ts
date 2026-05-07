/**
 * Freelancer Pulse — Constants
 * v0.0.1
 */

import type { JobStatus, Platform } from './types';

// ─── Status Colors ──────────────────────────────────────

export const STATUS_COLORS: Record<JobStatus, string> = {
  clipped: '#6B7280',     // Gray
  applied: '#3B82F6',     // Blue
  interviewed: '#F59E0B', // Amber
  offered: '#8B5CF6',     // Purple
  hired: '#10B981',       // Green
  rejected: '#EF4444',    // Red
  closed: '#374151',      // Dark Gray
};

export const STATUS_LABELS: Record<JobStatus, string> = {
  clipped: 'Clipped',
  applied: 'Applied',
  interviewed: 'Interviewed',
  offered: 'Offered',
  hired: 'Hired',
  rejected: 'Rejected',
  closed: 'Closed',
};

// ─── Platform Colors ────────────────────────────────────

export const PLATFORM_COLORS: Record<Platform, string> = {
  upwork: '#14A800',
  fiverr: '#00B22D',
};

export const PLATFORM_LABELS: Record<Platform, string> = {
  upwork: 'Upwork',
  fiverr: 'Fiverr',
};

// ─── URL Patterns ───────────────────────────────────────

export const PLATFORM_PATTERNS: Record<Platform, RegExp[]> = {
  upwork: [
    /upwork\.com\/nx\/search\/jobs/i,
    /upwork\.com\/jobs\//i,
  ],
  fiverr: [
    /fiverr\.com\/search\/gigs/i,
    /fiverr\.com\/[^/]+\/[^/]+$/i,
  ],
};

// ─── Storage ────────────────────────────────────────────

export const STORAGE_KEYS = {
  jobs: 'fp_jobs',
  settings: 'fp_settings',
} as const;

export const DEFAULT_SETTINGS = {
  darkMode: false,
};

/** Chrome storage quota (10MB in bytes) */
export const STORAGE_QUOTA_BYTES = 10 * 1024 * 1024;

// ─── UI ─────────────────────────────────────────────────

export const POPUP_WIDTH = 350;
export const POPUP_MIN_HEIGHT = 480;
export const POPUP_MAX_HEIGHT = 600;
export const TOAST_DURATION_MS = 3000;
export const SEARCH_DEBOUNCE_MS = 300;
