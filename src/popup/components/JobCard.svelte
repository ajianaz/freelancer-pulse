<script lang="ts">
  import type { ClippedJob } from '$lib/types';

  interface Props {
    job: ClippedJob;
    onSelect: (job: ClippedJob) => void;
  }

  let { job, onSelect }: Props = $props();

  import { formatBudget, timeAgo, truncate } from '$lib/utils';
  import { STATUS_COLORS, STATUS_LABELS, PLATFORM_COLORS, PLATFORM_LABELS } from '$lib/constants';
</script>

<button
  class="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
  onclick={() => onSelect(job)}
>
  <div class="flex items-start justify-between gap-2">
    <p class="text-[13px] font-medium text-gray-900 dark:text-gray-100 leading-tight">
      {truncate(job.title, 60)}
    </p>
    <span
      class="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium text-white"
      style="background-color: {STATUS_COLORS[job.status]}"
    >
      {STATUS_LABELS[job.status]}
    </span>
  </div>
  <div class="flex items-center gap-2 mt-1.5">
    <span
      class="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium text-white"
      style="background-color: {PLATFORM_COLORS[job.platform]}"
    >
      {PLATFORM_LABELS[job.platform]}
    </span>
    <span class="text-[11px] text-gray-500 dark:text-gray-400">
      {formatBudget(job.budget)}
    </span>
    <span class="text-[11px] text-gray-400">·</span>
    <span class="text-[11px] text-gray-400">{timeAgo(job.clippedAt)}</span>
  </div>
  {#if job.notes}
    <p class="text-[11px] text-gray-400 mt-1 italic">{truncate(job.notes, 50)}</p>
  {/if}
</button>
