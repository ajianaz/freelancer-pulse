/**
 * Freelancer Pulse — Chrome Storage API Wrapper
 * v0.0.1 — Phase 1 placeholder (full impl in Phase 2)
 */

import type { ClippedJob, AppSettings } from './types';

const STORAGE_KEYS = {
  jobs: 'fp_jobs',
  settings: 'fp_settings',
} as const;

const DEFAULT_SETTINGS: AppSettings = {
  darkMode: false,
  currency: 'USD',
  autoArchiveDays: 90,
};

/** Get a value from chrome.storage.local */
export async function getStorage<T>(key: string): Promise<T | undefined> {
  const result = await chrome.storage.local.get(key);
  return result[key] as T | undefined;
}

/** Set a value in chrome.storage.local */
export async function setStorage<T>(key: string, value: T): Promise<void> {
  await chrome.storage.local.set({ [key]: value });
}

/** Remove a key from chrome.storage.local */
export async function removeStorage(key: string): Promise<void> {
  await chrome.storage.local.remove(key);
}

/** Get all saved jobs */
export async function getJobs(): Promise<ClippedJob[]> {
  const jobs = await getStorage<ClippedJob[]>(STORAGE_KEYS.jobs);
  return jobs ?? [];
}

/** Save a new job */
export async function saveJob(job: ClippedJob): Promise<void> {
  const jobs = await getJobs();
  jobs.push(job);
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

/** Get app settings */
export async function getSettings(): Promise<AppSettings> {
  const settings = await getStorage<AppSettings>(STORAGE_KEYS.settings);
  return settings ?? DEFAULT_SETTINGS;
}

/** Update app settings */
export async function updateSettings(updates: Partial<AppSettings>): Promise<void> {
  const settings = await getSettings();
  await setStorage(STORAGE_KEYS.settings, { ...settings, ...updates });
}

export { STORAGE_KEYS, DEFAULT_SETTINGS };
