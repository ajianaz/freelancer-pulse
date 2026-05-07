<script lang="ts">
  import { onMount } from 'svelte';
  import { getJobs } from '$lib/storage';
  import type { ClippedJob } from '$lib/types';

  let jobs: ClippedJob[] = $state([]);
  let loading = $state(true);

  onMount(async () => {
    try {
      jobs = await getJobs();
    } catch (err) {
      console.error('[Freelancer Pulse] Failed to load jobs:', err);
    } finally {
      loading = false;
    }
  });
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

  <!-- Content -->
  {#if loading}
    <div class="flex-1 flex items-center justify-center">
      <div class="animate-spin w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full"></div>
    </div>
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
    <!-- Job list placeholder (Epic 3 will replace this) -->
    <div class="flex-1 overflow-y-auto p-2">
      <p class="text-xs text-gray-500 text-center py-4">{jobs.length} job(s) clipped</p>
    </div>
  {/if}

  <!-- Footer -->
  <footer class="shrink-0 px-4 h-8 border-t border-gray-200 dark:border-gray-700 flex items-center text-[11px] text-gray-400">
    <span>v0.0.1</span>
  </footer>
</div>
