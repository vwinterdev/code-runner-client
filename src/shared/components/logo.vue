<template>
  <div class="flex items-center gap-2 cursor-pointer">
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="text-primary-600 dark:text-primary-400"
    >
      <!-- Code brackets with gradient effect -->
      <path
        d="M10 8L6 16L10 24"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22 8L26 16L22 24"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 12L18 20"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
      />
      <circle cx="16" cy="16" r="2" fill="currentColor" />
    </svg>
    <span class="font-bold text-lg text-gray-900 dark:text-gray-100">CodeRunner</span>
  </div>
</template>

<style scoped>
svg {
  transition: transform 0.2s ease;
}

div:hover svg {
  transform: scale(1.05);
}
</style>

