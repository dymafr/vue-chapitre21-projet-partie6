<script setup lang="ts">
import AppShop from './components/Shop/AppShop.vue'
import AppCart from './components/Cart/AppCart.vue'
import type { FilterUpdate } from '@/shared/interfaces'
import { useProducts } from './stores/productStore'
import { useCart } from './stores/cartStore'

const productStore = useProducts()
productStore.seed();
const cartStore = useCart()

function updateFilter(filterUpdate: FilterUpdate) {
  productStore.updateFilter(filterUpdate)
}

function incPage() {
  productStore.incPage()
}

function addProductToCart(productId: string) {
  cartStore.addProductToCart(productId)
}

function removeProductFromCart(productId: string) {
  cartStore.removeProductFromCart(productId)
}

productStore.$onAction(({ name, after, args }) => {
  if (name === 'updateFilter' && args[0].search === undefined) {
    after(() => {
      productStore.page = 1
      productStore.products = []
      productStore.moreResults = true
      productStore.fetchProducts()
    })
  } else if (name === 'incPage') {
    after(() => {
      productStore.fetchProducts()
    })
  }
})
</script>

<template>
  <div class="d-flex flex-column">
    <AppShop
      @update-filter="updateFilter"
      @add-product-to-cart="addProductToCart"
      @inc-page="incPage"
      :products="productStore.filteredProducts"
      :filters="productStore.filters"
      :more-results="productStore.moreResults"
      :page="productStore.page"
    />
    <AppCart
      v-if="!cartStore.cartEmpty"
      :cart="cartStore.cart"
      @remove-product-from-cart="removeProductFromCart"
    />
  </div>
</template>

<style scoped lang="scss"></style>
