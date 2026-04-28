<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTheme } from '../../composables/useTheme'
import type { Product, ProductResponse } from '../../types/product'

const { isLight } = useTheme()

const products = ref<Product[]>([])
const loading = ref(true)

const hardwareNames = [
  'ST Power Drill Pro',
  'ST Precision Saw',
  'ST Strike Hammer',
  'ST Angle Grinder',
  'ST Measuring Tape',
  'ST Spirit Level',
  'ST Screwdriver Set',
  'ST Wrench Set',
]
import drillImg from '../../assets/products/drill.jpg'
import sawImg from '../../assets/products/saw.jpg'
import hammerImg from '../../assets/products/hammer.jpg'
import grinderImg from '../../assets/products/grinder.jpg'
import tapeImg from '../../assets/products/tape.jpg'
import levelImg from '../../assets/products/level.jpg'
import screwdriverImg from '../../assets/products/screwdriver.jpg'
import wrenchImg from '../../assets/products/wrench.jpg'

const hardwareImages = [
    drillImg, // 1. Drill
    sawImg, // 2. Saw
    hammerImg, // 3. Hammer
    grinderImg, // 4. Angle Grinder
    tapeImg, // 5. Measuring Tape
    levelImg, // 6. Spirit Level
    screwdriverImg, // 7. Screwdriver Set
    wrenchImg, // 8. Wrench Set
]

onMounted(async () => {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=8')
    const data: ProductResponse = await response.json()

    // Mapping ensure the titles and images stay synced by index
    products.value = data.products.map((product, index) => ({
      ...product,
      title: hardwareNames[index] ?? `ST Hardware Tool ${product.id}`,
      description: 'Professional construction hardware product built for strength, durability, and daily site work.',
      thumbnail: hardwareImages[index] ?? product.thumbnail,
    }))
  } catch (error) {
    console.error('Failed to fetch products:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section
    id="products"
    class="py-16 transition-colors duration-300"
    :class="isLight ? 'bg-gray-50' : 'bg-linear-to-b from-black to-[#111]'"
  >
    <div class="max-w-7xl mx-auto px-6">
      <div class="mb-10 text-center">
        <h2
          class="text-3xl font-black mb-2"
          :class="isLight ? 'text-yellow-600' : 'text-yellow-400'"
        >
          ST Construction Hardware Products
        </h2>

        <p :class="isLight ? 'text-gray-500' : 'text-gray-400'">
          API-powered construction tools and hardware products
        </p>
      </div>

      <div v-if="loading" class="text-center text-gray-400">
        Loading products...
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="product in products"
          :key="product.id"
          class="rounded-lg overflow-hidden transition-all duration-300 group"
          :class="
            isLight
              ? 'bg-white border border-gray-200 hover:border-yellow-400/60 hover:shadow-[0_0_20px_rgba(202,138,4,0.15)]'
              : 'bg-[#1a1a1a] border border-[#2a2a2a] hover:border-yellow-400/60 hover:shadow-[0_0_20px_rgba(255,215,0,0.15)]'
          "
        >
          <div class="overflow-hidden h-48">
            <img
              :src="product.thumbnail"
              :alt="product.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div class="p-4">
            <h3
              class="font-bold text-sm mb-1"
              :class="isLight ? 'text-yellow-600' : 'text-yellow-400'"
            >
              {{ product.title }}
            </h3>

            <p class="text-xs mb-3 leading-relaxed text-gray-500">
              {{ product.description }}
            </p>

            <div class="flex items-center justify-between">
              <span
                class="font-black text-lg"
                :class="isLight ? 'text-yellow-700' : 'text-yellow-300'"
              >
                ${{ product.price }}
              </span>

              <button
                class="text-black text-xs font-bold px-3 py-1.5 rounded bg-yellow-400 hover:bg-yellow-300 transition-colors duration-200"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>