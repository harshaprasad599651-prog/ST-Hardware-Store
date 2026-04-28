<template>
  <section id="tools" class="py-16 transition-colors duration-300"
    :class="isLight ? 'bg-gray-50' : 'bg-linear-to-b from-black to-[#111]'">
    <div class="max-w-7xl mx-auto px-6">

      <!-- TITLE -->
      <div class="mb-10 text-center">
        <h2 class="text-3xl font-black mb-2"
          :class="isLight ? 'text-yellow-600' : 'text-yellow-400'">
          ST Professional Tools
        </h2>
        <p :class="isLight ? 'text-gray-500' : 'text-gray-400'">
          Professional-grade tools engineered with Solid Trust
        </p>
      </div>

      <!-- PRODUCTS GRID -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="product in toolsData"
          :key="product.id"
          class="rounded-lg overflow-hidden transition-all duration-300 group"
          :class="isLight
            ? 'bg-white border border-gray-200 hover:border-yellow-400/60 hover:shadow-[0_0_20px_rgba(202,138,4,0.15)]'
            : 'bg-[#1a1a1a] border border-[#2a2a2a] hover:border-yellow-400/60 hover:shadow-[0_0_20px_rgba(255,215,0,0.15)]'"
        >
          <div class="overflow-hidden h-48">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div class="p-4">
            <h3 class="font-bold text-sm mb-1"
              :class="isLight ? 'text-yellow-600' : 'text-yellow-400'">
              {{ product.name }}
            </h3>

            <p class="text-xs mb-3 leading-relaxed"
              :class="isLight ? 'text-gray-500' : 'text-gray-500'">
              {{ product.description }}
            </p>

            <div class="flex items-center justify-between">
              <span class="font-black text-lg"
                :class="isLight ? 'text-yellow-700' : 'text-yellow-300'">
                {{ product.price }}
              </span>

              <button
                class="text-black text-xs font-bold px-3 py-1.5 rounded transition-colors duration-200"
                :class="isLight ? 'bg-yellow-500 hover:bg-yellow-400' : 'bg-yellow-400 hover:bg-yellow-300'"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useTheme } from '../../composables/useTheme'
const { isLight } = useTheme()

const toolsData = [
  { id: 1, name: 'ST Power Drill Pro', description: 'Heavy-duty cordless drill built on unwavering reliability', price: '$89.99', image: 'https://images.unsplash.com/photo-1770763233593-74dfd0da7bf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 2, name: 'ST Precision Saw', description: 'Professional circular saw - solid performance you can depend on every cut', price: '$149.99', image: 'https://images.unsplash.com/photo-1720594069679-943da72cc1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 3, name: 'ST Strike Hammer', description: 'Unbreakable steel construction - solid craftsmanship, trusted strength', price: '$24.99', image: 'https://images.unsplash.com/photo-1526714719019-b3032b5b5aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 4, name: 'ST Power Grinder', description: 'Industrial-strength grinder - solid quality that never quits', price: '$79.99', image: 'https://images.unsplash.com/photo-1674117068854-9dcc8a16dba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 5, name: 'ST Precision Tape', description: '25ft professional tape - solid accuracy you can trust on every project', price: '$14.99', image: 'https://images.unsplash.com/photo-1559647746-9b2f216d2dc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 6, name: 'ST Level Pro', description: 'Guaranteed precision - solid alignment in every measurement', price: '$29.99', image: 'https://images.unsplash.com/photo-1567361808976-260065224468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 7, name: 'ST Screwdriver Set', description: 'Premium engineered set - solid performance that never strips or fails', price: '$34.99', image: 'https://images.unsplash.com/photo-1770386582823-3a7094e35b22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 8, name: 'ST Wrench Set', description: 'Unbreakable precision tools - solid construction, trusted results', price: '$44.99', image: 'https://images.unsplash.com/photo-1773517460150-ce9c889de703?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
]
</script>