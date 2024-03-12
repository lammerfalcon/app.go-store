<script setup lang="ts">
import { MainButton, BackButton, ClosingConfirmation, Confirm, ShareWidget } from 'vue-tg'
function handleBackButton() {
  // ...
}
function handleConfirmClose(ok: boolean) {
  // ...
}
function handleMainButton() {
  // ...
}
</script>

<template>
  <Confirm message="Hello?" @close="handleConfirmClose" />
  <div class="pl-4 pr-4">
    <div class="h-screen flex justify-center items-center">
      omg
    </div>
  </div>
<!--  <BackButton @click="handleBackButton" />-->
  <ClosingConfirmation />
<!--  <ShareWidget
    url="https://vue-tg.pages.dev"
    comment="Telegram integration for Vue"
  />-->
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
