<template>
<Loading :active="isLoading"></Loading>
    <section class="container py-5">
      <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
        <li class="breadcrumb-item">產品列表</li>
      </ol>
    </nav>
        <div class="row g-3">
            <div class="col-lg-2">
              <div class="list-group text-center text-lg-start">
                <button type="button" class="list-group-item"
                :class="{ 'active' : this.category === item.value}"
                @click.prevent="this.category=item.value" v-for="item in categoryList" :key="item.value">{{item.value}}</button>
            </div>
          </div>
          <div class="col-lg-10">
            <div class="row row-cols-lg-4 row-cols-md-2 row-cols-1 g-3">
              <div class="col" v-for="item in filterProducts" :key="item.id">
                <div class="card h-100">
                  <img :src="item.imageUrl" class="card-img-top img-fluid" style="object-fit:cover; height: 200px;cursor:pointer" :alt="item.title" :title="item.title" @click="getProduct(item.id)">
                  <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                    <h5 class="card-title fw-bold">{{item.title}}</h5>
                    <p class="card-text">{{item.description}}</p>
                    </div>
                    <div>
                      <div class="text-end">
                      <p class="h5" v-if="item.price===item.origin_price">{{ $filters.currency(item.origin_price) }} 元</p>
                      <del class="h6" v-if="item.price!==item.origin_price">原價 {{ $filters.currency(item.origin_price) }} 元</del>
                      <p class="h5" v-if="item.price!==item.origin_price">現在只要 {{ $filters.currency(item.price) }} 元</p>
                      </div>
                      <div class="text-end">
                        <button class="btn btn-outline-primary mx-2"><i class="bi bi-suit-heart"></i></button>
                        <button type="button" class="btn btn-outline-primary align-self-end" :disabled="this.status.loadingItem === item.id" @click="addCart(item.id)">
                          <div v-if="this.status.loadingItem === item.id"
                        class="spinner-border text-light spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                        </div>
                        <i class="bi bi-cart3"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
</template>

<script>
export default {
  data () {
    return {
      products: [],
      isLoading: false,
      categoryList: [
        { value: '全部' },
        { value: '精選玩具' },
        { value: '玩偶' },
        { value: '模型' },
        { value: '益智' }
      ],
      category: '全部',
      status: {
        loadingItem: ''
      }
    }
  },
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            console.log(res.data)
            this.products = res.data.products
          }
        })
    },
    getProduct (id) {
      this.$router.push(`/products/${id}`)
    },
    addCart (id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: 1
      }
      this.$http.post(url, { data: cart })
        .then((res) => {
          this.status.loadingItem = ''
          console.log(res)
          this.$httpMessageState(res, '加入購物車')
        })
    }
  },
  computed: {
    filterProducts () {
      return this.products.filter(item => {
        if (this.category === '全部') {
          return this.products
        }
        return item.category.match(this.category)
      })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
