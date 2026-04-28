<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '../../types/product'
import { useTheme } from '../../composables/useTheme'

const { isLight } = useTheme()

defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  close: []
}>()

const quantity = ref(1)

const increaseQty = () => {
  quantity.value++
}

const decreaseQty = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 bg-black/80 flex items-start justify-center p-4 overflow-y-auto"
    @click.self="emit('close')"
  >
    <div
      class="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl"
      :class="isLight ? 'bg-white text-gray-900' : 'bg-[#171717] text-white'"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <!-- IMAGE -->
        <div class="rounded-lg overflow-hidden bg-white">
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="w-full h-75 md:h-105 object-contain bg-white"
          />
        </div>

        <!-- DETAILS -->
        <div>
          <div class="flex justify-between items-start gap-4">
            <h2
              class="text-3xl font-black"
              :class="isLight ? 'text-gray-900' : 'text-yellow-400'"
            >
              {{ product.title }}
            </h2>

            <button
              @click="emit('close')"
              class="text-3xl font-bold hover:text-red-500"
            >
              ×
            </button>
          </div>

          <p
            class="mt-3 text-sm leading-relaxed"
            :class="isLight ? 'text-gray-600' : 'text-gray-400'"
          >
            {{ product.description }}
          </p>

          <!-- RATING -->
          <div class="mt-4 flex items-center gap-3">
            <span class="text-yellow-400 text-lg">★★★★★</span>
            <span class="text-sm">{{ product.rating }} ratings</span>
          </div>

          <!-- PRICE BOX -->
          <div
            class="mt-5 p-4 rounded-lg"
            :class="isLight ? 'bg-yellow-50' : 'bg-black/40'"
          >
            <p class="text-sm text-gray-500">Price</p>

            <div class="flex items-end gap-3">
              <span class="text-4xl font-black text-yellow-500">
                ${{ product.price }}
              </span>

              <span class="text-sm text-gray-500 line-through">
                ${{ Math.round(product.price + product.price * 0.25) }}
              </span>

              <span class="text-sm font-bold text-red-500">
                -{{ Math.round(product.discountPercentage) }}%
              </span>
            </div>
          </div>

          <!-- INFO -->
          <div
            class="mt-5 space-y-3 text-sm"
            :class="isLight ? 'text-gray-700' : 'text-gray-300'"
          >
            <p><strong>Brand:</strong> ST Hardware</p>
            <p><strong>Category:</strong> Construction Hardware</p>
            <p><strong>Stock:</strong> {{ product.stock }} available</p>
            <p><strong>Warranty:</strong> 6 months service warranty</p>
            <p><strong>Delivery:</strong> Islandwide delivery available</p>
          </div>

          <!-- QUANTITY -->
          <div class="mt-6 flex items-center gap-4">
            <span class="font-bold">Quantity</span>

            <div class="flex items-center border rounded overflow-hidden">
              <button
                @click="decreaseQty"
                class="px-4 py-2 bg-gray-200 text-black font-bold"
              >
                -
              </button>

              <span class="px-5 py-2">
                {{ quantity }}
              </span>

              <button
                @click="increaseQty"
                class="px-4 py-2 bg-gray-200 text-black font-bold"
              >
                +
              </button>
            </div>
          </div>

          <!-- BUTTONS -->
          <div class="mt-8 grid grid-cols-2 gap-4">
            <button
              class="py-3 rounded-lg font-black border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition"
            >
              Add to Cart
            </button>

            <button
              class="py-3 rounded-lg font-black bg-yellow-400 text-black hover:bg-yellow-300 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <!-- DESCRIPTION SECTION -->
      <div
        class="p-6 border-t"
        :class="isLight ? 'border-gray-200' : 'border-gray-700'"
      >
        <h3 class="text-xl font-black mb-3 text-yellow-400">
          Product Details
        </h3>

        <p
          class="leading-relaxed"
          :class="isLight ? 'text-gray-600' : 'text-gray-400'"
        >
          This {{ product.title }} is designed for construction, repair, workshop,
          and professional hardware use. It is suitable for daily site work and
          built with durability, strength, and reliability in mind.
        </p>
      </div>
    </div>
  </div>
</template>