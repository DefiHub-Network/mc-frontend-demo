<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import WebApp from "@twa-dev/sdk";
const router = useRouter();
const onClose = () => {
  WebApp.close();
};

onMounted(() => {
  const data = WebApp.initData;
  const parsedData = queryString.parse(data);
  const start_param = parsedData.start_param;
  if (start_param) {
    const params = start_param.toString().replace("orderId_", "");
    if (params) {
      const orderId = params;
    }
  }
});
</script>
<template>
  <div class="page">
    <div class="payment-success">Payment success</div>
    <div>
      <button class="btn btn-defi" @click="onClose">Close</button>
    </div>
  </div>
</template>
<style lang="scss">
.page {
  padding: 20px;
  text-align: center;
  padding: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  .payment-success {
    font-size: 30px;
  }
  .btn {
    margin-top: 20px;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 4px;
    height: 36px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 590;
    line-height: 18px;
    transition: transform 0.125s ease-in-out;

    &.btn-defi {
      background-color: rgb(0, 140, 255);
      color: white;
    }
  }
}
</style>
