<script lang="ts">
  import { onMount } from 'svelte';
  import { getJobs, getStorageUsage, getStats } from '$lib/storage';
  import type { ClippedJob, PipelineStats, Platform, JobStatus } from '$lib/types';
  import JobCard from './components/JobCard.svelte';
  import JobDetail from './components/JobDetail.svelte';
  import Toast from './components/Toast.svelte';
  import { STATUS_COLORS, STATUS_LABELS, STORAGE_QUOTA_BYTES, SEARCH_DEBOUNCE_MS } from '$lib/constants';
  import { formatBudget, timeAgo } from '$lib/utils';

  // ─── State ────────────────────────────────────────────
  let jobs: ClippedJob[] = $state([]);
  let loading = $state(true);
  let selectedJob: ClippedJob | null = $state(null);
  let toast = $state<{ message: string; type: 'success' | 'warning' | 'error' } | null>(null);
  let storagePercent = $state(0);

  // Search & filter
  let searchQuery = $state('');
  let platformFilter: Platform | 'all' = $state('all');
  let statusFilter: JobStatus | 'all' = $state('all');
  let stats: PipelineStats | null = $state(null);

  // Weekly stats
  let weeklyClipped = $state(0);
  let weeklyApplied = $state(0);
  let weeklyHired = $state(0);

  let searchTimeout: ReturnType<typeof setTimeout> | null = null;
  let debouncedQuery = $state('');

  // ─── Lifecycle ────────────────────────────────────────
  onMount(async () => {
    await loadJobs();
    await loadStorageUsage();
  });

  // ─── Data Loading ─────────────────────────────────────
  async function loadJobs() {
    try {
      jobs = await getJobs();
      stats = await getStats();
      computeWeeklyStats();
    } catch (err) {
      console.error('[Freelancer Pulse] Failed to load jobs:', err);
      showToast('Failed to load jobs', 'error');
    } finally {
      loading = false;
    }
  }

  async function loadStorageUsage() {
    try {
      const { usedBytes } = await getStorageUsage();
      storagePercent = Math.round((usedBytes / STORAGE_QUOTA_BYTES) * 100);
    } catch {
      // Non-critical
    }
  }

  function computeWeeklyStats() {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() + 1); // Monday
    weekStart.setHours(0, 0, 0, 0);

    weeklyClipped = 0;
    weeklyApplied = 0;
    weeklyHired = 0;

    for (const job of jobs) {
      const clippedAt = new Date(job.clippedAt);
      if (clippedAt >= weekStart) {
        if (job.status === 'clipped') weeklyClipped++;
        if (job.status === 'applied') weeklyApplied++;
        if (job.status === 'hired') weeklyHired++;
      }
    }
  }

  // ─── Computed: Filtered Jobs ──────────────────────────
  let filteredJobs = $derived.by(() => {
    let result = [...jobs];

    // Search filter
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.clientName.toLowerCase().includes(q) ||
          j.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    // Platform filter
    if (platformFilter !== 'all') {
      result = result.filter((j) => j.platform === platformFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((j) => j.status === statusFilter);
    }

    return result;
  });

  // ─── Search debounce ─────────────────────────────────
  $effect(() => {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      debouncedQuery = searchQuery;
    }, SEARCH_DEBOUNCE_MS);
  });

  // ─── Event Handlers ──────────────────────────────────
  function selectJob(job: ClippedJob) {
    selectedJob = job;
  }

  function deselectJob() {
    selectedJob = null;
  }

  function handleJobUpdate(updatedJob: ClippedJob) {
    const idx = jobs.findIndex((j) => j.id === updatedJob.id);
    if (idx !== -1) jobs[idx] = updatedJob;
    selectedJob = updatedJob;
    refreshStats();
  }

  function handleJobDelete(id: string) {
    jobs = jobs.filter((j) => j.id !== id);
    selectedJob = null;
    showToast('Job deleted', 'success');
    refreshStats();
    loadStorageUsage();
  }

  async function refreshStats() {
    stats = await getStats();
    computeWeeklyStats();
  }

  function showToast(message: string, type: 'success' | 'warning' | 'error') {
    toast = { message, type };
    setTimeout(() => (toast = null), 3000);
  }
</script>

<div class="flex flex-col h-full min-h-[480px] max-h-[600px] bg-white dark:bg-gray-900">
  <!-- Header -->
  <header class="flex items-center justify-between px-4 h-12 border-b border-gray-200 dark:border-gray-700 shrink-0">
    <div class="flex items-center gap-2">
      <div class="w-5 h-5 rounded-full bg-green-500"></div>
      <h1 class="text-sm font-semibold text-gray-900 dark:text-gray-100">Freelancer Pulse</h1>
    </div>
    <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" title="Settings">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </button>
  </header>

  <!-- Toast -->
  {#if toast}
    <div class="shrink-0">
      <Toast message={toast.message} type={toast.type} />
    </div>
  {/if}

  <!-- Content -->
  {#if loading}
    <div class="flex-1 flex items-center justify-center">
      <div class="animate-spin w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full"></div>
    </div>
  {:else if selectedJob}
    <JobDetail
      job={selectedJob}
      onBack={deselectJob}
      onUpdate={handleJobUpdate}
      onDelete={handleJobDelete}
    />
  {:else if jobs.length === 0}
    <!-- Empty State -->
    <div class="flex-1 flex flex-col items-center justify-center px-6 py-8">
      <div class="text-4xl mb-4">📋</div>
      <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">No jobs clipped yet</p>
      <p class="text-xs text-gray-500 dark:text-gray-400 text-center">
        Browse Upwork or Fiverr and<br/>click Clip to save a job
      </p>
      <div class="flex gap-3 mt-4">
        <span class="inline-flex items-center gap-1 text-xs text-gray-500">
          <span class="w-2 h-2 rounded-full" style="background: #14A800"></span> Upwork
        </span>
        <span class="inline-flex items-center gap-1 text-xs text-gray-500">
          <span class="w-2 h-2 rounded-full" style="background: #00B22D"></span> Fiverr
        </span>
      </div>
    </div>
  {:else}
    <!-- Search bar -->
    <div class="shrink-0 px-3 py-2 border-b border-gray-100 dark:border-gray-800">
      <input
        type="text"
        placeholder="🔍 Search jobs..."
        bind:value={searchQuery}
        class="w-full px-3 py-1.5 text-[12px] bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 text-gray-900 dark:text-gray-100 placeholder-gray-400"
      />
    </div>

    <!-- Weekly summary -->
    <div class="shrink-0 px-3 py-2 border-b border-gray-100 dark:border-gray-800">
      <p class="text-[11px] text-gray-400 mb-1.5">📊 This Week</p>
      <div class="grid grid-cols-3 gap-2">
        <div class="text-center">
          <p class="text-[16px] font-bold text-gray-900 dark:text-gray-100">{weeklyClipped}</p>
          <p class="text-[11px] text-gray-400">Clipped</p>
        </div>
        <div class="text-center">
          <p class="text-[16px] font-bold text-blue-500">{weeklyApplied}</p>
          <p class="text-[11px] text-gray-400">Applied</p>
        </div>
        <div class="text-center">
          <p class="text-[16px] font-bold text-green-500">{weeklyHired}</p>
          <p class="text-[11px] text-gray-400">Hired</p>
        </div>
      </div>
    </div>

    <!-- Filter tabs -->
    <div class="shrink-0 flex items-center gap-1 px-3 py-1.5 border-b border-gray-100 dark:border-gray-800">
      <button
        class="px-2 py-1 text-[11px] rounded-md {platformFilter === 'all' ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}"
        onclick={() => (platformFilter = 'all')}
      >
        All
      </button>
      <button
        class="px-2 py-1 text-[11px] rounded-md {platformFilter === 'upwork' ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}"
        onclick={() => (platformFilter = 'upwork')}
      >
        Upwork
      </button>
      <button
        class="px-2 py-1 text-[11px] rounded-md {platformFilter === 'fiverr' ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}"
        onclick={() => (platformFilter = 'fiverr')}
      >
        Fiverr
      </button>
      <div class="flex-1"></div>
      <!-- Status filter -->
      <select
        class="text-[11px] px-2 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-gray-500 focus:outline-none"
        bind:value={statusFilter}
      >
        <option value="all">All Status</option>
        <option value="clipped">Clipped</option>
        <option value="applied">Applied</option>
        <option value="interviewed">Interviewed</option>
        <option value="offered">Offered</option>
        <option value="hired">Hired</option>
        <option value="rejected">Rejected</option>
        <option value="closed">Closed</option>
      </select>
    </div>

    <!-- Job list -->
    <div class="flex-1 overflow-y-auto p-2 space-y-2">
      {#if filteredJobs.length === 0}
        <p class="text-[12px] text-gray-400 text-center py-4">No jobs match your filters</p>
      {:else}
        {#each filteredJobs as job (job.id)}
          <JobCard {job} onSelect={selectJob} />
        {/each}
      {/if}
    </div>
  {/if}

  <!-- Footer — Storage usage -->
  <footer class="shrink-0 px-4 h-8 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2 text-[11px] text-gray-400">
    <span>💾 {jobs.length} clips</span>
    <div class="flex-1 h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
      <div
        class="h-full rounded-full transition-all {storagePercent > 95 ? 'bg-red-500' : storagePercent > 80 ? 'bg-amber-500' : 'bg-gray-300 dark:bg-gray-600'}"
        style="width: {Math.min(storagePercent, 100)}%"
      ></div>
    </div>
    <span>{storagePercent}%</span>
  </footer>
</div>
