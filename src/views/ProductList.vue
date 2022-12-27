<template>
  <LoadingEl :active="isLoading" />
  <section class="container py-lg-5">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
        <li class="breadcrumb-item">產品列表</li>
      </ol>
    </nav>
    <div class="productlist text-center px-4 py-5">
      <div class="text-white text-center p-3 cover d-inline-block">
        <p class="mb-0">玩出激情，玩出收穫，玩轉世界。</p>
        <h1 class="fw-bold my-3">產品列表</h1>
        <p class="mb-0">這裡是快樂的起點~</p>
      </div>
    </div>
    <div class="row g-4 justify-content-around py-5">
      <div class="col-lg-2">
        <div class="text-center d-flex flex-column align-items-center">
          <button
            type="button"
            class="m-2 category py-2"
            :class="{ active: category === item.value }"
            @click.prevent="category = item.value"
            v-for="item in categoryList"
            :key="item.value"
          >
            {{ item.value }}
          </button>
        </div>
      </div>
      <div class="col-lg-9">
        <div class="row row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4">
          <div class="col" v-for="item in filterProducts" :key="item.id">
            <div class="card h-100 border cardHover">
              <img
                :src="item.imageUrl"
                class="card-img-top img-fluid"
                style="object-fit: cover; height: 200px; cursor: pointer"
                :alt="item.title"
                :title="item.title"
              />
              <div class="card-body d-flex flex-column justify-content-between">
                <div>
                  <div class="d-flex justify-content-between align-items-center">
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
                    <del class="h6" v-if="item.price !== item.origin_price">
                      原價 {{ $filters.currency(item.origin_price) }} 元
                    </del>
                    <p class="h5 text-danger" v-if="item.price !== item.origin_price">
                      特價 {{ $filters.currency(item.price) }} 元
                    </p>
                  </div>
                  <div class="text-end position-relative" style="z-index:3;">
                    <button
                      type="button"
                      class="btn btn-primary btnCircle mx-2 rounded-circle fs-4 text-white"
                      :class="{ active: favorite.includes(item.id) }"
                      style="width: 50px; height: 50px"
                      @click="toggleFavorite(item)"
                    >
                      <i class="bi bi-suit-heart"/>
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary btnCircle align-self-end rounded-circle fs-4 text-white"
                      style="width: 50px; height: 50px"
                      :disabled="status.loadingItem === item.id"
                      @click="addCart(item, item.id)"
                    >
                      <i class="bi bi-cart3"/>
                    </button>
                  </div>
                </div>
                <a href="#" class="stretched-link" @click.prevent="getProduct(item.id)"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import favorite from '@/methods/favorite'

export default {
  data () {
    return {
      products: [],
      isLoading: false,
      categoryList: [
        { value: '全部' },
        { value: '玩偶' },
        { value: '模型' },
        { value: '益智' }
      ],
      category: '全部',
      status: {
        loadingItem: ''
      },
      favorite: favorite.getFavorite() || []
    }
  },
  inject: ['emitter'],
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.products = res.data.products
        }
        this.isLoading = false
      })
    },
    getProduct (id) {
      this.$router.push(`/products/${id}`)
    },
    addCart (item, id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: 1
      }
      this.$http.post(url, { data: cart }).then((res) => {
        this.status.loadingItem = ''
        this.emitter.emit('update-cart', id)
        this.isLoading = false
        this.$httpMessageState(res, `將"${item.title}"加入購物車`)
      })
    },
    toggleFavorite (item) {
      if (this.favorite.includes(item.id)) {
        this.favorite.splice(this.favorite.indexOf(item.id), 1)
        this.$httpMessageState(
          {
            data: {
              success: true
            }
          },
          `將"${item.title}"移除我的最愛`
        )
      } else {
        this.favorite.push(item.id)
        this.$httpMessageState(
          {
            data: {
              success: true
            }
          },
          `將"${item.title}"加入我的最愛`
        )
      }
      favorite.addToFavorite(this.favorite)
      this.emitter.emit('update-favorite', this.favorite)
    }
  },
  computed: {
    filterProducts () {
      return this.products.filter((item) => {
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
