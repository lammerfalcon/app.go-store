<script setup lang="ts">
import { Confirm, MainButton } from 'vue-tg'
import { ref } from 'vue'
import { useTodoApi } from '../services/todo/useTodoApi'

const showConfirm = ref(false)

const { getTodos } = useTodoApi()
async function fetchTodos() {
  const { entities, meta } = await getTodos()

  return entities
}
const products = fetchTodos()
console.log(products)

function handleConfirmClose(ok: boolean) {
  if (ok)
    console.log('confirmed')
  else console.log('cancelled')
  console.log(ok)
  showConfirm.value = false
}

function handleMainButton() {
  console.log('main button clicked')
}
</script>

<template>
  <Confirm v-if="showConfirm === true" message="Hello?" @close="handleConfirmClose" />
  <div class="grid grid-cols-2 gap-4">
    <div v-for="(product, index) in products" :key="index" class="card card-compact bg-base-100 shadow-xl">
      <figure class="w-full">
        <img :src="product.preview" alt="Shoes">
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          {{ product.name }}
        </h2>
        <p />
        <div class="card-actions justify-center items-center">
          <button class="btn btn-primary">
            +
          </button>
          <div class="text-2xl">
            2
          </div>
          <button class="btn btn-primary">
            -
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="pl-4 pr-4">
    <div class="h-screen flex justify-center items-center" @click="showConfirm = true">
      <button class="btn btn-outline btn-warning">
        omg
      </button>
    </div>
  </div>
  <MainButton @click="handleMainButton" />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
