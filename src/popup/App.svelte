<script lang="ts">
  let name = 'Freelancer Pulse';

  function handleClick() {
    console.log('Phase 1 bootstrap - placeholder');
  }
</script>

<main class="flex flex-col items-center justify-center min-h-[500px] p-6">
  <h1 class="text-2xl font-bold text-pulse-600">{name}</h1>
  <p class="text-gray-500 dark:text-gray-400 mt-2">Your Freelance Pipeline, in One Click</p>
  <button
    onclick={handleClick}
    class="mt-6 px-4 py-2 bg-pulse-600 text-white rounded-lg hover:bg-pulse-700 transition-colors"
  >
    v0.0.1 — Bootstrap
  </button>
</main>
