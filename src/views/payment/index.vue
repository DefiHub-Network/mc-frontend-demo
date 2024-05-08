<script lang="ts" setup>
import WebApp from "@twa-dev/sdk";
import axios from "axios";
import { ref } from "vue";

const listItem = ref([
  { itemId: 1, price: 0.1, name: "Premium for 1 month", desciption: "" },
  { itemId: 2, price: 0.2, name: "Premium for 3 month", desciption: "" },
  { itemId: 3, price: 0.3, name: "Premium for 5 month", desciption: "" },
]);

const onBuyItem = async (pakg) => {
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = {
    packageId: pakg.itemId,
  };
  const result = await axios.post(
    "https://mc-api-demo.defihub.network/subscribe",
    data,
    axiosConfig
  );

  const obj = result.data.data;

  WebApp.openTelegramLink(obj.payLink);
};
</script>
<template>
  <div class="list-item">
    <div v-for="item in listItem" :key="item.itemId" class="item">
      <div>
        <div class="item-name">{{ item.name }}</div>
        <div class="item-price">{{ item.price }} TON</div>
        <button @click="onBuyItem(item)">Buy</button>
      </div>
    </div>
  </div>
</template>
<style>
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
