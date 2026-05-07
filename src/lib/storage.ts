/**
 * Freelancer Pulse — Chrome Storage API Wrapper
 * v0.0.1
 */

import type { ClippedJob, AppSettings, PipelineStats, Platform, JobStatus } from './types';
import { STORAGE_KEYS, DEFAULT_SETTINGS, STORAGE_QUOTA_BYTES } from './constants';

// ─── Low-Level Helpers ──────────────────────────────────

/** Get a value from chrome.storage.local */
async function getStorage<T>(key: string): Promise<T | undefined> {
  const result = await chrome.storage.local.get(key);
  return result[key] as T | undefined;
}

/** Set a value in chrome.storage.local */
async function setStorage<T>(key: string, value: T): Promise<void> {
  await chrome.storage.local.set({ [key]: value });
}

// ─── Jobs CRUD ──────────────────────────────────────────

/** Get all saved jobs */
export async function getJobs(): Promise<ClippedJob[]> {
  const jobs = await getStorage<ClippedJob[]>(STORAGE_KEYS.jobs);
  return jobs ?? [];
}

/** Get a single job by ID */
export async function getJob(id: string): Promise<ClippedJob | null> {
  const jobs = await getJobs();
  return jobs.find((j) => j.id === id) ?? null;
}

/** Add a new job */
export async function addJob(job: ClippedJob): Promise<void> {
  const jobs = await getJobs();
  jobs.unshift(job); // newest first
  await setStorage(STORAGE_KEYS.jobs, jobs);
}

/** Update an existing job by ID */
export async function updateJob(id: string, updates: Partial<ClippedJob>): Promise<void> {
  const jobs = await getJobs();
  const index = jobs.findIndex((j) => j.id === id);
  if (index === -1) throw new Error(`Job ${id} not found`);
  jobs[index] = { ...jobs[index], ...updates };
  await setStorage(STORAGE_KEYS.jobs, jobs);
}

/** Delete a job by ID */
export async function deleteJob(id: string): Promise<void> {
  const jobs = await getJobs();
  const filtered = jobs.filter((j) => j.id !== id);
  await setStorage(STORAGE_KEYS.jobs, filtered);
}

/** Find a job by URL (dedup check) */
export async function findJobByUrl(url: string): Promise<ClippedJob | null> {
  const jobs = await getJobs();
  return jobs.find((j) => j.url === url) ?? null;
}

// ─── Stats (derived) ────────────────────────────────────

/** Get pipeline statistics */
export async function getStats(): Promise<PipelineStats> {
  const jobs = await getJobs();

  const byPlatform: Record<Platform, number> = { upwork: 0, fiverr: 0 };
  const byStatus: Record<JobStatus, number> = {
    clipped: 0,
    applied: 0,
    interviewed: 0,
    offered: 0,
    hired: 0,
    rejected: 0,
    closed: 0,
  };

  for (const job of jobs) {
    byPlatform[job.platform]++;
    byStatus[job.status]++;
  }

  return { total: jobs.length, byPlatform, byStatus };
}

// ─── Settings ───────────────────────────────────────────

/** Get app settings */
export async function getSettings(): Promise<AppSettings> {
  const settings = await getStorage<AppSettings>(STORAGE_KEYS.settings);
  return settings ?? { ...DEFAULT_SETTINGS };
}

/** Update app settings */
export async function updateSettings(updates: Partial<AppSettings>): Promise<void> {
  const settings = await getSettings();
  await setStorage(STORAGE_KEYS.settings, { ...settings, ...updates });
}

// ─── Storage Usage ──────────────────────────────────────

/** Get storage usage in bytes */
export async function getStorageUsage(): Promise<{ usedBytes: number; totalBytes: number }> {
  const all = await chrome.storage.local.get(null);
  const usedBytes = new Blob([JSON.stringify(all)]).size;
  return { usedBytes, totalBytes: STORAGE_QUOTA_BYTES };
}

// ─── Re-exports ─────────────────────────────────────────

export { STORAGE_KEYS, DEFAULT_SETTINGS };
