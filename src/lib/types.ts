/**
 * Freelancer Pulse — Core Type Definitions
 * v0.0.1
 */

// ─── Platform ────────────────────────────────────────────

/** Supported job platforms */
export type Platform = 'upwork' | 'fiverr';

// ─── Pipeline Status ────────────────────────────────────

/** Job listing status in the pipeline */
export type JobStatus =
  | 'clipped'
  | 'applied'
  | 'interviewed'
  | 'offered'
  | 'hired'
  | 'rejected'
  | 'closed';

/** Ordered pipeline statuses */
export const PIPELINE_STATUSES: JobStatus[] = [
  'clipped',
  'applied',
  'interviewed',
  'offered',
  'hired',
];

/** Terminal statuses */
export const TERMINAL_STATUSES: JobStatus[] = ['rejected', 'closed'];

/** All statuses */
export const ALL_STATUSES: JobStatus[] = [...PIPELINE_STATUSES, ...TERMINAL_STATUSES];

// ─── Budget ─────────────────────────────────────────────

/** Currency codes */
export type Currency = 'USD' | 'EUR' | 'GBP' | 'IDR' | string;

/** Budget type */
export type BudgetType = 'fixed' | 'hourly' | 'unknown';

/** Parsed budget information */
export interface Budget {
  raw: string;           // Original text, e.g. "$500-$1,000"
  min: number | null;
  max: number | null;
  currency: Currency;
  type: BudgetType;
}

// ─── Job ─────────────────────────────────────────────────

/** A clipped job listing */
export interface ClippedJob {
  id: string;
  platform: Platform;
  title: string;
  url: string;
  description: string;
  budget: Budget;
  clientName: string;
  postedDate: string;     // ISO 8601 or null
  clippedAt: string;      // ISO 8601
  status: JobStatus;
  tags: string[];
  notes: string;
}

// ─── Parser Result ───────────────────────────────────────

/** Result from a platform-specific parser */
export interface ParserResult {
  platform: Platform;
  title: string;
  url: string;
  budgetRaw?: string;
  budgetMin?: number;
  budgetMax?: number;
  budgetType?: BudgetType;
  clientName?: string;
  postedDate?: string;
  description?: string;
  tags: string[];
}

// ─── Statistics ──────────────────────────────────────────

/** Pipeline statistics */
export interface PipelineStats {
  total: number;
  byPlatform: Record<Platform, number>;
  byStatus: Record<JobStatus, number>;
}

/** Weekly summary stats */
export interface WeeklyStats {
  clipped: number;
  applied: number;
  hired: number;
  weekStart: string; // ISO date of Monday
}

// ─── Settings ────────────────────────────────────────────

/** Application settings */
export interface AppSettings {
  darkMode: boolean;
}

// ─── Storage ─────────────────────────────────────────────

/** Chrome storage schema */
export interface StorageSchema {
  fp_jobs: ClippedJob[];
  fp_settings: AppSettings;
}

// ─── Messages ────────────────────────────────────────────

/** Message types between content script, popup, and service worker */
export type MessageType =
  | 'CLIP_JOB'
  | 'CLIP_RESULT'
  | 'CHECK_JOB'
  | 'CHECK_RESULT'
  | 'GET_CURRENT_TAB_INFO'
  | 'TAB_INFO'
  | 'PING';

export interface ClipJobMessage {
  type: 'CLIP_JOB';
  data: ParserResult;
}

export interface ClipResultMessage {
  type: 'CLIP_RESULT';
  data: { ok: boolean; job?: ClippedJob; error?: string };
}

export interface PingMessage {
  type: 'PING';
}

export interface TabInfoMessage {
  type: 'TAB_INFO';
  data: { platform: Platform | null; url: string; canClip: boolean };
}

export interface CheckJobMessage {
  type: 'CHECK_JOB';
  data: { url: string; fullUrl: string };
}

export interface CheckResultMessage {
  type: 'CHECK_RESULT';
  data: { exists: boolean };
}

export type ExtensionMessage =
  | ClipJobMessage
  | ClipResultMessage
  | CheckJobMessage
  | CheckResultMessage
  | PingMessage
  | TabInfoMessage;
