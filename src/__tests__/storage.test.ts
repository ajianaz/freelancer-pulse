import { describe, it, expect } from 'vitest';
import { getJobs, addJob, getJob, updateJob, deleteJob, findJobByUrl, getSettings, updateSettings } from '$lib/storage';
import type { ClippedJob } from '$lib/types';

function createMockJob(overrides: Partial<ClippedJob> = {}): ClippedJob {
  return {
    id: 'test-id-1',
    platform: 'upwork',
    title: 'Test Job',
    url: 'https://www.upwork.com/jobs/~test123',
    description: 'A test job',
    budget: { raw: '$500', min: 500, max: 500, currency: 'USD', type: 'fixed' },
    clientName: 'Test Client',
    postedDate: '2026-05-01T00:00:00Z',
    clippedAt: '2026-05-07T00:00:00Z',
    status: 'clipped',
    tags: ['react', 'typescript'],
    notes: '',
    ...overrides,
  };
}

describe('Storage — Jobs CRUD', () => {
  it('starts with empty jobs list', async () => {
    const jobs = await getJobs();
    expect(jobs).toEqual([]);
  });

  it('adds a job and retrieves it', async () => {
    const job = createMockJob();
    await addJob(job);
    const jobs = await getJobs();
    expect(jobs).toHaveLength(1);
    expect(jobs[0].id).toBe('test-id-1');
  });

  it('gets a single job by ID', async () => {
    const job = createMockJob();
    await addJob(job);
    const found = await getJob('test-id-1');
    expect(found).not.toBeNull();
    expect(found?.title).toBe('Test Job');
  });

  it('returns null for non-existent job', async () => {
    const found = await getJob('nonexistent');
    expect(found).toBeNull();
  });

  it('updates a job', async () => {
    const job = createMockJob();
    await addJob(job);
    await updateJob('test-id-1', { status: 'applied', notes: 'Applied!' });
    const updated = await getJob('test-id-1');
    expect(updated?.status).toBe('applied');
    expect(updated?.notes).toBe('Applied!');
  });

  it('throws when updating non-existent job', async () => {
    await expect(updateJob('nonexistent', { status: 'applied' })).rejects.toThrow('not found');
  });

  it('deletes a job', async () => {
    await addJob(createMockJob({ id: 'job-1' }));
    await addJob(createMockJob({ id: 'job-2', url: 'https://www.upwork.com/jobs/~other' }));
    await deleteJob('job-1');
    const jobs = await getJobs();
    expect(jobs).toHaveLength(1);
    expect(jobs[0].id).toBe('job-2');
  });

  it('finds a job by URL (dedup)', async () => {
    await addJob(createMockJob());
    const found = await findJobByUrl('https://www.upwork.com/jobs/~test123');
    expect(found).not.toBeNull();
    expect(found?.id).toBe('test-id-1');
  });

  it('returns null when no job matches URL', async () => {
    const found = await findJobByUrl('https://www.upwork.com/jobs/~nope');
    expect(found).toBeNull();
  });
});

describe('Storage — Settings', () => {
  it('returns default settings', async () => {
    const settings = await getSettings();
    expect(settings.darkMode).toBe(false);
  });

  it('updates settings', async () => {
    await updateSettings({ darkMode: true });
    const settings = await getSettings();
    expect(settings.darkMode).toBe(true);
  });
});
