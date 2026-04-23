<template>
  <header class="bg-linear-to-r from-black via-[#1a1a1a] to-black border-b-2 border-yellow-400 shadow-[0_4px_20px_rgba(255,215,0,0.2)] sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo Area -->
        <div class="flex items-center gap-3">
          <span class="text-4xl drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">⚒️</span>
          <div>
            <h1 class="text-2xl font-bold bg-linear-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent tracking-tight">
              ST Hardware
            </h1>
            <p class="text-gray-400 text-xs uppercase tracking-widest font-semibold">
              Solid Trust - Built to Last
            </p>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex gap-8 items-center">
          <div class="flex gap-6">
            <a
              v-for="link in navLinks"
              :key="link.href"
              :href="link.href"
              class="text-yellow-400 hover:text-white transition-all duration-300 font-bold text-sm uppercase tracking-wider relative group"
            >
              {{ link.label }}
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          <div class="h-6 w-px bg-yellow-400/30 mx-2"></div>

          <!-- Search Button -->
          <button class="text-yellow-400 hover:text-white hover:bg-yellow-400/10 p-2 rounded transition-all duration-300" aria-label="Search">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          <!-- Cart Button -->
          <button class="relative text-yellow-400 hover:text-white hover:bg-yellow-400/10 p-2 rounded transition-all duration-300" aria-label="Cart">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span class="absolute -top-1 -right-1 bg-yellow-400 text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">3</span>
          </button>

          <button class="bg-yellow-400 text-black font-black px-6 py-2 rounded-sm hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.3)]">
            LOGIN
          </button>
        </nav>

        <!-- Mobile Menu Toggle -->
        <button
          @click="isOpen = !isOpen"
          class="md:hidden text-yellow-400 focus:outline-none p-2 hover:bg-yellow-400/10 rounded-full transition-colors"
          aria-label="Toggle menu"
        >
          <svg v-if="!isOpen" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation Drawer -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-4 opacity-0"
      >
        <div v-if="isOpen" class="md:hidden mt-4 flex flex-col gap-2 border-t border-yellow-400/30 pt-4 pb-2">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            @click="isOpen=false"
            class="text-yellow-400 font-bold py-3 px-4 hover:bg-yellow-400/10 rounded"
          >
            {{ link.label }}
          </a>
          <!-- Mobile Search & Cart -->
          <div class="flex gap-3 px-4 pt-2">
            <button class="flex items-center gap-2 text-yellow-400 font-bold py-2 px-4 hover:bg-yellow-400/10 rounded flex-1 justify-center border border-yellow-400/30">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              Search
            </button>
            <button class="flex items-center gap-2 text-yellow-400 font-bold py-2 px-4 hover:bg-yellow-400/10 rounded flex-1 justify-center border border-yellow-400/30 relative">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              Cart
              <span class="bg-yellow-400 text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">3</span>
            </button>
          </div>
          <button class="bg-yellow-400 text-black font-black py-3 px-4 rounded-sm mx-4 mt-2 hover:bg-white transition-all duration-300">
            LOGIN
          </button>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

const navLinks = [
  { label: 'Tools',     href: '#tools' },
  { label: 'Materials', href: '#materials' },
  { label: 'Contact',   href: '#contact' },
]
</script>
