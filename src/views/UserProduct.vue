<template>
  <Loading :active="isLoading"></Loading>
  <div class="container py-5">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
        <li class="breadcrumb-item"><router-link to="/products">產品列表</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="row row-cols-1 justify-content-center flex-row-reverse">
      <div class="col col-md-5">
        <h2>{{ product.title }}</h2>
        <hr>
        <div class="fs-4">{{ product.description }}</div>
        <div class="py-3">{{ product.content }}</div>
        <div class="h5" v-if="product.price===product.origin_price">{{ $filters.currency(product.origin_price) }} 元</div>
        <del class="h6" v-if="product.price!==product.origin_price">原價 {{ $filters.currency(product.origin_price) }} 元</del>
        <div class="h5" v-if="product.price!==product.origin_price">現在只要 {{ $filters.currency(product.price) }} 元</div>
        <div class="input-group pb-3">
        <select class="form-select" aria-label="Default select example" v-model="qty">
          <option selected disabled>選擇數量</option>
          <option :value="qty" v-for="qty in 10" :key="qty">{{ qty }}</option>
        </select>
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="addToCart(product.id, qty)"
        >
          加到購物車
        </button>
        </div>
      </div>
      <div class="col col-md-7">
        <img :src="product.imageUrl" alt="" class="img-fluid mb-3">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: {},
      id: '',
      qty: 1
    }
  },
  methods: {
    getProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.isLoading = true
      this.$http.get(api).then((response) => {
        console.log(response.data)
        this.isLoading = false
        if (response.data.success) {
          this.product = response.data.product
        }
      })
    },
    addToCart (id, qty = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      this.isLoading = true
      this.$http.post(url, { data: cart }).then((response) => {
        this.isLoading = false
        this.$httpMessageState(response, '加入購物車')
        this.$router.push('/user/cart')
      })
    }
  },
  created () {
    this.id = this.$route.params.productId
    this.getProduct()
  }
}
</script>
