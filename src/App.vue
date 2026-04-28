<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from './components/Layout/AppHeader.vue'
import Background from './components/Layout/Background.vue'
import Tools from './components/Layout/Tools.vue'
import Login from './components/Layout/Login.vue'

const showLogin = ref(false)
</script>

<template>
  <Background>
    <AppHeader @open-login="showLogin = true" />
    <Tools />

    <!-- Login Modal Overlay -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showLogin"
        class="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4"
        @click.self="showLogin = false"
      >
        <Login @close="showLogin = false" />
      </div>
    </Transition>

  </Background>
</template>