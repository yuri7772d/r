<template>
  <!-- Mobile toggle button (visible on small screens) -->
  <button
    @click="open = true"
    aria-label="Open sidebar"
    class="md:hidden fixed top-4 left-4 z-60 p-2 rounded-md shadow-md bg-white"
  >
    <!-- simple hamburger -->
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>

  <!-- Overlay for mobile when sidebar is open -->
  <transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 z-40 bg-black/50 md:hidden"
      @click="close"
      aria-hidden="true"
    ></div>
  </transition>

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform ease-in-out duration-300',
      open ? 'translate-x-0' : '-translate-x-full',
      'md:translate-x-0 md:static md:shadow-none'
    ]"
    role="navigation"
    aria-label="Main sidebar"
    @keydown.escape.window="close"
  >
    <div class="h-full flex flex-col">
      <!-- header inside sidebar -->
      <div class="flex items-center justify-between p-4 border-b">
        <div class="text-lg font-semibold">เมนู</div>
        <!-- close button only visible on mobile -->
        <button @click="close" class="md:hidden p-2 rounded hover:bg-gray-100" aria-label="Close sidebar">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <!-- content area (slot) -->
      <nav class="flex-1 overflow-y-auto p-4 space-y-2">
        <slot>
          <!-- default menu items if user doesn't provide slot -->
          <a href="#" class="block px-3 py-2 rounded hover:bg-gray-100">Dashboard</a>
          <a href="#" class="block px-3 py-2 rounded hover:bg-gray-100">Projects</a>
          <a href="#" class="block px-3 py-2 rounded hover:bg-gray-100">Settings</a>
        </slot>
      </nav>

      <!-- footer area (optional) -->
      <div class="p-4 border-t">
        <button @click="toggleCollapse" class="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
          {{ collapsed ? 'ขยาย' : 'ย่อเมนู' }}
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, watchEffect, onMounted, onBeforeUnmount } from 'vue'

// open controls whether the sidebar is visible on small screens
const open = ref(false)
// collapsed controls optionally rendering a compact state (example behavior)
const collapsed = ref(false)

function close() {
  open.value = false
}

function toggleCollapse() {
  collapsed.value = !collapsed.value
}

// Close mobile sidebar when the viewport becomes md or larger
let mql
onMounted(() => {
  mql = window.matchMedia('(min-width: 768px)')
  const handler = (e) => {
    if (e.matches) {
      open.value = false
    }
  }
  mql.addEventListener ? mql.addEventListener('change', handler) : mql.addListener(handler)
  // cleanup
  onBeforeUnmount(() => {
    mql.removeEventListener ? mql.removeEventListener('change', handler) : mql.removeListener(handler)
  })
})
</script>

<!-- No extra styles needed; Tailwind utilities are used. Add subtle transition for overlay -->
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>