<script setup lang="ts">
import type { ProductCartInterface } from '@/shared/interfaces'
import AppCartProduct from './AppCartProduct.vue'

defineProps<{
  cart: ProductCartInterface[]
}>()

const emit = defineEmits<{
  (e: 'removeProductFromCart', productId: string): void
}>()
</script>

<template>
  <div class="d-flex flex-column">
    <AppCartProduct
      v-for="product of cart"
      :product="product"
      :key="product._id"
      @remove-product-from-cart="emit('removeProductFromCart', $event)"
    />
  </div>
</template>

<style lang="scss" scoped></style>
