<template>
  <div class="app-layout">
    <Sidebar v-if="!$route.meta.hideLayout" />

    <div class="content">
      <Topbar v-if="!$route.meta.hideLayout" />
      <main class="page">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
import Topbar from '../components/Topbar.vue'
</script>
