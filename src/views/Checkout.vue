<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container py-5">
    <div class="d-flex align-items-center justify-content-around text-nowrap">
      <div
        class="border d-inline-block text-center p-4 bg-dark text-white"
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
        class="border d-inline-block text-center p-4"
        style="width: 150px; height: 150px"
      >
        <i class="bi bi-clipboard-check fs-4"></i>
        <p class="mt-2">送出訂單</p>
        <p class="mb-0">STEP 3</p>
      </div>
    </div>
  </div>
  <div class="my-5 row justify-content-center">
    <Form class="col-md-6" v-slot="{ errors }" @submit="createOrder">
      <div class="mb-3">
        <label for="email" class="form-label">Email*</label>
        <Field
          id="email"
          name="email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors['email'] }"
          placeholder="請輸入 Email"
          rules="email|required"
          v-model="form.user.email"
        ></Field>
        <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名*</label>
        <Field
          id="name"
          name="姓名"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['姓名'] }"
          placeholder="請輸入姓名"
          rules="required"
          v-model="form.user.name"
        ></Field>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話*</label>
        <Field
          id="tel"
          name="電話"
          type="tel"
          class="form-control"
          :class="{ 'is-invalid': errors['電話'] }"
          placeholder="請輸入電話"
          rules="required"
          v-model="form.user.tel"
        ></Field>
        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址*</label>
        <Field
          id="address"
          name="地址"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入地址"
          rules="required"
          v-model="form.user.address"
        ></Field>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="pay" class="form-label">付款方式*</label>
        <select
          id="pay"
          class="form-select"
          aria-label="Default select example"
          v-model="payment"
        >
          <option disabled selected>選擇付款方式</option>
          <option value="ATM">ATM</option>
          <option value="GooglePay">信用卡</option>
          <option value="ApplePay">ApplePay</option>
          <option value="GooglePay">GooglePay</option>
        </select>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea
          name=""
          id="message"
          class="form-control"
          cols="30"
          rows="10"
          v-model="form.message"
        ></textarea>
      </div>
      <div class="text-end">
        <button
          class="btn btn-primary"
          :class="{ disabled: this.payment === '選擇付款方式' }"
        >
          送出訂單
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      orderId: '',
      payment: '選擇付款方式'
    }
  },
  methods: {
    createOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.$http.post(url, { data: order }).then((res) => {
        this.orderId = res.data.orderId
        this.$router.push(`/checkout/${this.orderId}`)
      })
    }
  }
}
</script>
