<script lang="ts">
  interface Props {
    message: string;
    type: 'success' | 'warning' | 'error';
  }

  let { message, type }: Props = $props();

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400',
    warning: 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400',
    error: 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400',
  };
</script>

<div class="mx-2 p-2 rounded-lg border text-[12px] {colors[type]}">
  {message}
</div>
