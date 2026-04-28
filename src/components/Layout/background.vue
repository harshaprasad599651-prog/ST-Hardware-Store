<template>
  <div class="min-h-screen transition-colors duration-300"
    :class="isLight ? 'bg-gray-50' : 'bg-black'">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '../../composables/useTheme'
const { isLight } = useTheme()
</script>