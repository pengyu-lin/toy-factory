<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container py-5">
    <div class="d-flex align-items-center justify-content-around text-nowrap">
      <div
        class="border d-inline-block text-center p-4"
        style="width: 150px; height: 150px"
      >
        <i class="bi bi-list-check fs-4"></i>
        <p class="mt-2">填寫資料</p>
        <p class="mb-0">STEP 1</p>
      </div>
      <i class="bi bi-arrow-right fs-1 d-none d-sm-block"></i>
      <div
        class="border d-inline-block text-center p-4"
        style="width: 150px; height: 150px"
      >
        <i class="bi bi-credit-card fs-4"></i>
        <p class="mt-2">確認付款</p>
        <p class="mb-0">STEP 2</p>
      </div>
      <i class="bi bi-arrow-right fs-1 d-none d-sm-block"></i>
      <div
        class="border d-inline-block text-center p-4 bg-dark text-white"
        style="width: 150px; height: 150px"
      >
        <i class="bi bi-clipboard-check fs-4"></i>
        <p class="mt-2">送出訂單</p>
        <p class="mb-0">STEP 3</p>
      </div>
    </div>
  </div>

  <div class="text-center">
    <img src="../assets/images/delivery.png" class="img-fluid pb-3" alt="" style="width:250px">
    <h2>恭喜您，購買完成!</h2>
    <h3>商品會在2至3個工作天內送達</h3>
  </div>
  <div class="d-flex justify-content-center">
    <button type="buttton" class="btn btn-primary m-3" @click="this.$router.push('/')">回首頁</button>
    <button type="buttton" class="btn btn-primary m-3" @click="this.$router.push('/products')">繼續購物!</button>
  </div>
</template>
