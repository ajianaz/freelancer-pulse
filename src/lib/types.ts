/**
 * Freelancer Pulse — Core Type Definitions
 * v0.0.1 — Phase 1 placeholder
 */

/** Supported job platforms */
export type Platform = 'upwork' | 'fiverr';

/** Job listing status in the pipeline */
export type JobStatus = 'saved' | 'applied' | 'interviewed' | 'offered' | 'rejected' | 'archived';

/** Currency codes */
export type Currency = 'USD' | 'EUR' | 'GBP' | 'IDR' | string;

/** Budget type */
export interface Budget {
  min: number;
  max: number;
  currency: Currency;
  type: 'fixed' | 'hourly';
}

/** A clipped job listing */
export interface ClippedJob {
  id: string;
  platform: Platform;
  externalId: string;
  title: string;
  description: string;
  client: {
    name: string;
    rating?: number;
    reviewCount?: number;
    country?: string;
  };
  budget: Budget;
  skills: string[];
  tags: string[];
  url: string;
  postedAt: string; // ISO 8601
  clippedAt: string; // ISO 8601
  status: JobStatus;
  notes?: string;
}

/** Job statistics */
export interface JobStats {
  total: number;
  byPlatform: Record<Platform, number>;
  byStatus: Record<JobStatus, number>;
  bySkill: Record<string, number>;
  avgBudget: Budget | null;
}

/** Chrome storage schema */
export interface StorageSchema {
  jobs: ClippedJob[];
  settings: AppSettings;
}

/** Application settings */
export interface AppSettings {
  darkMode: boolean;
  currency: Currency;
  autoArchiveDays: number;
}

/** Message types between content script, popup, and service worker */
export type MessageType =
  | 'CLIP_JOB'
  | 'GET_JOBS'
  | 'GET_STATS'
  | 'UPDATE_JOB'
  | 'DELETE_JOB'
  | 'OPEN_POPUP';

export interface ClipJobMessage {
  type: 'CLIP_JOB';
  payload: Omit<ClippedJob, 'id' | 'clippedAt' | 'status'>;
}

export interface GetJobsMessage {
  type: 'GET_JOBS';
  payload?: {
    filter?: Partial<Pick<ClippedJob, 'platform' | 'status'>>;
    sort?: 'date' | 'budget' | 'title';
    order?: 'asc' | 'desc';
  };
}

export interface UpdateJobMessage {
  type: 'UPDATE_JOB';
  payload: {
    id: string;
    updates: Partial<ClippedJob>;
  };
}

export interface DeleteJobMessage {
  type: 'DELETE_JOB';
  payload: { id: string };
}

export type ExtensionMessage =
  | ClipJobMessage
  | GetJobsMessage
  | UpdateJobMessage
  | DeleteJobMessage;
