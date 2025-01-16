<script setup lang="ts">
import WebApp from "@twa-dev/sdk";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const height = ref(window.innerHeight + "px");
const updateSize = () => {
  height.value = window.innerHeight + "px";
};
document.addEventListener("resize", updateSize);
onBeforeUnmount(() => {
  document.addEventListener("resize", updateSize);
});

console.log("WebApp.initData", WebApp.initData);
console.log("route.initData", route);
</script>
<template>
  <iframe
    :src="'https://appdev.defihub.network/trade/swap#' + WebApp.initData"
    :style="{ width: '100%', height: '500px', border: 0 }"
  ></iframe>
</template>
