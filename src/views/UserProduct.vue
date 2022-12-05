<template>
  <Loading :active="isLoading"></Loading>
  <div class="container py-5">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
        <li class="breadcrumb-item">
          <router-link to="/products">產品列表</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ product.title }}
        </li>
      </ol>
    </nav>
    <div class="row row-cols-1 justify-content-center">
      <div class="col col-md-7">
        <img :src="product.imageUrl" alt="" class="img-fluid mb-3" />
      </div>
      <div class="col col-md-5">
        <h2 class="d-flex align-items-center text-primary fw-bold">
          {{ product.title }}
          <span class="badge bg-warning rounded-pill fs-5 ms-3 text-dark">
            {{ product.category }}
          </span>
        </h2>
        <hr />
        <div class="fs-4">{{ product.description }}</div>
        <div class="py-3 text-secondary" style="white-space: pre-line">{{ product.content }}</div>
        <div class="h5" v-if="product.price === product.origin_price">
          {{ $filters.currency(product.origin_price) }} 元
        </div>
        <del class="h6" v-if="product.price !== product.origin_price"
          >原價 {{ $filters.currency(product.origin_price) }} 元</del
        >
        <div
          class="h5 text-danger"
          v-if="product.price !== product.origin_price"
        >
          現在只要 {{ $filters.currency(product.price) }} 元
        </div>
        <div class="input-group pb-3" style="width:200px">
          <select
            class="form-select border-dark"
            aria-label="Default select example"
            v-model="qty"
          >
            <option selected disabled>選擇數量</option>
            <option :value="qty" v-for="qty in 10" :key="qty">{{ qty }}</option>
          </select>
          <button
            type="button"
            class="btn btn-outline-dark"
            @click="addToCart(product.title, product.id, qty)"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
    <hr />
    <h4 class="text-center">— 類似商品 —</h4>
    <div class="row row-cols-lg-4 row-cols-sm-2 row-cols-1 g-4 justify-content-center">
          <div class="col" v-for="item in similarProducts" :key="item.id">
            <div class="card h-100 border overflow-hidden">
              <img
                :src="item.imageUrl"
                class="card-img-top img-fluid"
                style="object-fit: cover; height: 200px; cursor: pointer"
                :alt="item.title"
                :title="item.title"
                @click="goToProduct(item.id)"
              />
              <div class="card-body d-flex flex-column justify-content-between">
                <div>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <h5 class="card-title fw-bold text-primary mb-0">
                      {{ item.title }}
                    </h5>
                    <span class="badge bg-warning rounded-pill text-black">
                      {{ item.category }}
                    </span>
                  </div>
                  <hr />
                  <p class="card-text">{{ item.description }}</p>
                </div>
                <div>
                  <div class="text-end">
                    <p class="h5" v-if="item.price === item.origin_price">
                      {{ $filters.currency(item.origin_price) }} 元
                    </p>
                    <del class="h6" v-if="item.price !== item.origin_price"
                      >原價 {{ $filters.currency(item.origin_price) }} 元</del
                    >
                    <p
                      class="h5 text-danger"
                      v-if="item.price !== item.origin_price"
                    >
                      特價 {{ $filters.currency(item.price) }} 元
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      products: [],
      product: {},
      id: '',
      qty: 1,
      isLoading: false
    }
  },
  inject: ['emitter'],
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
    goToProduct (id) {
      this.$router.push(`/products/${id}`)
    },
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.products = res.data.products
        }
      })
    },
    addToCart (item, id, qty = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      this.isLoading = true
      this.$http.post(url, { data: cart }).then((response) => {
        this.isLoading = false
        this.$httpMessageState(response, `將"${item}"加入購物車`)
        this.emitter.emit('update-cart', id)
      })
    }
  },
  computed: {
    similarProducts () {
      const similarCategory = this.products.filter((item) => {
        return item.category.match(this.product.category) && item.id !== this.id
      })
      const similarItems = similarCategory.sort(() => Math.random() - 0.5)
      if (similarItems.length > 4) {
        similarItems.splice(0, parseInt(similarItems.length) - 4)
      }
      return similarItems
    }
  },
  created () {
    this.id = this.$route.params.productId
    this.getProduct()
    this.getProducts()
  }
}
</script>
