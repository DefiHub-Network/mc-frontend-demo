<script lang="ts" setup>
import axios from "axios";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useDebounceFn } from "@vueuse/core";
import WebApp from "@twa-dev/sdk";
// list data sample
const listItem = ref([
  { itemId: 1, price: 0.01, name: "Premium for 1 month", desciption: "" },
  { itemId: 2, price: 0.02, name: "Premium for 3 month", desciption: "" },
  { itemId: 3, price: 0.03, name: "Premium for 5 month", desciption: "" },
]);

const statusPayment = ref(0);
let intervalCheck;
const onBuyItem = useDebounceFn(async (pakg) => {
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // call my api backend to get url payment
  const data = {
    packageId: pakg.itemId,
  };
  const result = await axios.post(
    "https://mc-api-demo.defihub.network/subscribe",
    data,
    axiosConfig
  );

  const obj = result.data.data;
  if (obj) {
    // open payment
    WebApp.openTelegramLink(obj.payLink);
    // wait payment success
    waitBuySuccess();
  }
}, 200);

const waitBuySuccess = () => {
  intervalCheck = setInterval(() => {
    refreshPlanUser();
  }, 10000);
  setTimeout(() => {
    if (intervalCheck) clearInterval(intervalCheck);
  }, 90000);
};

onBeforeUnmount(() => {
  if (intervalCheck) clearInterval(intervalCheck);
});

// refresh plan of user
const refreshPlanUser = async () => {
  const result = await axios.get(
    "https://mc-api-demo.defihub.network/my-subscription"
  );
  const obj = result.data.data;
  statusPayment.value = obj.totalMonths;
};
onMounted(() => {
  refreshPlanUser();
});
</script>
<template>
  <div class="plan-title">Please select plan</div>
  <div class="list-item">
    <div v-for="item in listItem" :key="item.itemId" class="item">
      <div>
        <div class="item-name">{{ item.name }}</div>
        <div class="item-price">{{ item.price }} TON</div>
        <button @click="onBuyItem(item)">Buy</button>
      </div>
    </div>
  </div>
  <div class="plan-title">Current plan month: {{ statusPayment }}</div>
</template>
<style lang="scss">
.plan-title {
  font-size: 20px;
  font-weight: 600;

  color: var(--color-text);
  padding: 20px;
}
.list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  .item {
    padding: 20px;
    background-color: var(--color-bg);
    border-radius: 10px;
    margin: 10px;

    .item-name {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 10px;
      color: var(--color-text);
    }
    .item-price {
      font-size: 14px;
      margin-top: 8px;
      color: var(--color-text);
    }
    button {
      padding: 4px 8px;
      border-radius: 6px;
      background-color: rgb(10, 231, 106);
      width: 100%;
      color: black;
      margin-top: 8px;
      text-align: center;
      cursor: pointer;
      font-size: 14px;
    }
  }
}
</style>
