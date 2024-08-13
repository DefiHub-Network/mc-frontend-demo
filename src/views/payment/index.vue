<script lang="ts" setup>
import axios from "axios";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useDebounceFn } from "@vueuse/core";
import WebApp from "@twa-dev/sdk";
// list data sample
const listItem = ref([
  {
    itemId: 1,
    price: 0.01,
    name: "Premium for 1 month",
    desciption: "manualOpenPay:false, skipTxVerified:false",
  },
  {
    itemId: 2,
    price: 0.02,
    name: "Premium for 3 month",
    desciption: "manualOpenPay:true, skipTxVerified:true",
  },
  {
    itemId: 3,
    price: 0.03,
    name: "Premium for 5 month",
    desciption: "manualOpenPay:true, skipTxVerified:false",
  },
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
    const link = obj.payLink;
    WebApp.openTelegramLink(link);
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

const walletMint = ref("");
const priceMint = ref(0.05);

// call api to open defihub
const onMintNFT = useDebounceFn(async () => {
  if (Number(priceMint.value) >= 0.05 && walletMint.value.length > 0) {
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "api-key": "sandbox00",
      },
    };
    const data = {
      collectionId: 1,
      offchainId: Math.floor(new Date().getTime() / 1000),
      ownerAddress: walletMint.value,
      price: Number(priceMint.value),
      uri: "QmR9ybqa8haQBLtECEwNR6PfmW5bzfJtaYAHvsHMceSGTM/elite.json",
      image: "ipfs://QmYvozGpk7faijainsVjWk7xyNwLkkLQy5i7mh6H5Dm9uy/nine.jpeg",
    };
    const result = await axios.post(
      "https://nft-api.defihub.network/v1/conversion",
      data,
      axiosConfig
    );

    const obj = result.data.data;
    if (obj) {
      // open gateway conversion
      console.log(obj);
      WebApp.openTelegramLink(
        `https://t.me/mt_22_test_bot/mintnft?startapp=${obj.id}`
      );
    }
  }
}, 200);
</script>
<template>
  <div class="plan-title">Please select plan</div>
  <div class="list-item">
    <div v-for="item in listItem" :key="item.itemId" class="item">
      <div>
        <div class="item-name">{{ item.name }}</div>
        <div class="item-price">{{ item.price }} TON</div>
        <div class="item-config">{{ item.desciption }}</div>
        <button @click="onBuyItem(item)">Buy</button>
      </div>
    </div>
  </div>
  <div class="plan-title">Current plan month: {{ statusPayment }}</div>
  <div class="plan-title">Mint NFT</div>
  <div class="list-item">
    <div class="nft-item">
      <img src="@/assets/image.jpeg" />
    </div>
  </div>
  <div class="info-min">
    <label>Wallet</label>
    <input type="text" v-model="walletMint" placeholder="wallet mint" />
    <label>Price</label>
    <input
      type="number"
      min="0.05"
      v-model="priceMint"
      placeholder="Price mint"
    />
    <div><button @click="onMintNFT">Mint</button></div>
  </div>
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
    padding: 6px;
    background-color: var(--color-bg);
    border-radius: 10px;
    margin-right: 8px;
    :last-child {
      margin-right: 0px;
    }

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
    .item-config {
      font-size: 12px;
      margin-top: 12px;
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
.nft-item {
  img {
    width: 150px;
    height: 150px;
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
.info-min {
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 300px;
  align-items: center;
  margin: 0 auto;
  button,
  label {
    margin-top: 10px;
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    font-size: 16px;
  }
}
</style>
