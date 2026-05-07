<script lang="ts">
  import type { ClippedJob, JobStatus } from '$lib/types';
  import { STATUS_COLORS, STATUS_LABELS } from '$lib/constants';

  const allStatuses: JobStatus[] = ['clipped', 'applied', 'interviewed', 'offered', 'hired', 'rejected', 'closed'];
  import { formatBudget, timeAgo } from '$lib/utils';
  import { updateJob, deleteJob } from '$lib/storage';

  interface Props {
    job: ClippedJob;
    onBack: () => void;
    onUpdate: (job: ClippedJob) => void;
    onDelete: (id: string) => void;
  }

  let { job, onBack, onUpdate, onDelete }: Props = $props();
  let notes = $state(job.notes);
  let showDeleteConfirm = $state(false);
  let showStatusDropdown = $state(false);

  async function changeStatus(status: JobStatus) {
    showStatusDropdown = false;
    await updateJob(job.id, { status });
    onUpdate({ ...job, status });
  }

  async function saveNotes() {
    if (notes !== job.notes) {
      await updateJob(job.id, { notes });
      onUpdate({ ...job, notes });
    }
  }

  async function confirmDelete() {
    await deleteJob(job.id);
    onDelete(job.id);
  }
</script>

<div class="flex flex-col h-full">
  <!-- Back button -->
  <button
    class="flex items-center gap-1 px-4 py-2 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
    onclick={onBack}
  >
    ← Back to list
  </button>

  <!-- Job detail content -->
  <div class="flex-1 overflow-y-auto px-4 pb-4">
    <!-- Title -->
    <h2 class="text-[14px] font-semibold text-gray-900 dark:text-gray-100 leading-snug">
      {job.title}
    </h2>

    <!-- Meta -->
    <div class="flex items-center gap-2 mt-2 text-[12px] text-gray-500">
      <span class="font-medium" style="color: {job.platform === 'upwork' ? '#14A800' : '#00B22D'}">
        {job.platform === 'upwork' ? 'Upwork' : 'Fiverr'}
      </span>
      {#if job.postedDate}
        <span>·</span>
        <span>Posted {timeAgo(job.postedDate)}</span>
      {/if}
    </div>

    <!-- Budget -->
    <div class="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <span class="text-[11px] text-gray-400">Budget</span>
      <p class="text-[14px] font-medium text-gray-900 dark:text-gray-100 mt-0.5">
        {formatBudget(job.budget)}
      </p>
    </div>

    {#if job.clientName}
      <div class="mt-2 text-[12px] text-gray-600 dark:text-gray-400">
        <span class="text-gray-400">Client:</span> {job.clientName}
      </div>
    {/if}

    <!-- Status dropdown -->
    <div class="mt-3 relative">
      <span class="text-[11px] text-gray-400">Status</span>
      <button
        class="mt-1 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
        onclick={() => (showStatusDropdown = !showStatusDropdown)}
      >
        <span class="w-2 h-2 rounded-full" style="background-color: {STATUS_COLORS[job.status]}"></span>
        {STATUS_LABELS[job.status]}
        <span class="text-gray-400">▾</span>
      </button>

      {#if showStatusDropdown}
        <div class="absolute z-10 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          {#each allStatuses as status}
            <button
              class="w-full flex items-center gap-2 px-3 py-2 text-[12px] hover:bg-gray-50 dark:hover:bg-gray-700 {status === job.status ? 'font-medium' : ''}"
              onclick={() => changeStatus(status)}
            >
              <span class="w-2 h-2 rounded-full" style="background-color: {STATUS_COLORS[status]}"></span>
              {STATUS_LABELS[status]}
              {#if status === job.status}
                <span class="ml-auto text-gray-400">✓</span>
              {/if}
            </button>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Tags -->
    {#if job.tags.length > 0}
      <div class="flex flex-wrap gap-1 mt-3">
        {#each job.tags as tag}
          <span class="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-[11px] text-gray-600 dark:text-gray-400 rounded">
            {tag}
          </span>
        {/each}
      </div>
    {/if}

    <!-- Description -->
    {#if job.description}
      <div class="mt-3">
        <span class="text-[11px] text-gray-400">Description</span>
        <p class="mt-1 text-[12px] text-gray-600 dark:text-gray-400 leading-relaxed">
          {job.description}
        </p>
      </div>
    {/if}

    <!-- Notes -->
    <div class="mt-4">
      <span class="text-[11px] text-gray-400">📝 Notes</span>
      <textarea
        class="mt-1 w-full p-2 text-[12px] border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-1 focus:ring-blue-400"
        rows="3"
        placeholder="Add notes..."
        bind:value={notes}
        onblur={saveNotes}
      ></textarea>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-3 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
      <a
        href={job.url}
        target="_blank"
        rel="noopener"
        class="text-[12px] text-blue-500 hover:text-blue-600 font-medium"
      >
        🔗 Open on {job.platform === 'upwork' ? 'Upwork' : 'Fiverr'}
      </a>

      {#if !showDeleteConfirm}
        <button
          class="ml-auto text-[12px] text-red-400 hover:text-red-600"
          onclick={() => (showDeleteConfirm = true)}
        >
          🗑️ Delete
        </button>
      {:else}
        <div class="ml-auto flex items-center gap-2">
          <span class="text-[12px] text-gray-500">Delete?</span>
          <button
            class="text-[12px] px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            onclick={confirmDelete}
          >
            Delete
          </button>
          <button
            class="text-[12px] px-2 py-1 text-gray-500 hover:text-gray-700"
            onclick={() => (showDeleteConfirm = false)}
          >
            Cancel
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>
