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
    src="https://c967-2405-4802-38-b740-ad55-c0da-b2df-d010.ngrok-free.app/trade/swap"
    :style="{ width: '100%', height: '500px', border: 0 }"
  ></iframe>
</template>
