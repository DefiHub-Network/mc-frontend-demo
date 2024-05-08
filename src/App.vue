<template>
  <div id="app" ref="app">
    <router-view />
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, onMounted } from "vue";
</script>
<style lang="scss">
:root {
  color-scheme: light dark;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background-color: var(--color-bg-secondary);
  color: var(--color-text);
}
</style>
