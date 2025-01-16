<script setup lang="ts">
import WebApp from "@twa-dev/sdk";
import { onBeforeUnmount, onMounted, ref } from "vue";

const height = ref(window.innerHeight + "px");
const updateSize = () => {
  height.value = window.innerHeight + "px";
};
document.addEventListener("resize", updateSize);
onBeforeUnmount(() => {
  document.addEventListener("resize", updateSize);
});
</script>
<template>
  <iframe
    src="https://appdev.defihub.network/trade/swap"
    :style="{ width: '100%', height: '500px', border: 0 }"
  ></iframe>
</template>
