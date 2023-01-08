<template>
  <LoadingEl :active="isLoading" />
  <div class="container py-lg-5">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
        <li class="breadcrumb-item">我的最愛</li>
      </ol>
    </nav>
    <h2><i class="bi bi-suit-heart-fill fs-3 text-danger"/> 我的最愛</h2>
    <hr />
    <div class="row">
      <div class="col-lg-8">
        <div
          class="text-center pb-5"
          :class="{ 'd-none': favortieProducts.length !== 0 }"
        >
          <i
            class="bi bi-suit-heart-fill text-danger"
            style="font-size: 150px"
          />
          <p class="fs-2">來去把喜歡的玩具加入最愛吧~!</p>
          <button
            type="button"
            class="btn btnStyle"
            @click="$router.push('/products')"
          >
            選玩具
          </button>
        </div>
        <div
          class="border border-primary d-flex flex-column flex-md-row justify-content-around align-items-center p-3 mb-3 text-center"
          v-for="item in favortieProducts"
          :key="item.id"
        >
          <img
            :src="item.imageUrl"
            class="productImg img-fluid"
            :alt="item.title"
            @click="getProduct(item.id)"
            style="cursor:pointer;"
          />
          <p class="h5 pt-ms-0 pt-3">{{ item.title }}</p>
          <div class="d-flex flex-column">
            <p class="h5 mb-md-0" v-if="item.price === item.origin_price">
              {{ $filters.currency(item.origin_price) }} 元
            </p>
            <del class="h6" v-if="item.price !== item.origin_price"
              >原價 {{ $filters.currency(item.origin_price) }} 元</del
            >
            <p class="h5 text-danger" v-if="item.price !== item.origin_price">
              特價 {{ $filters.currency(item.price) }} 元
            </p>
          </div>
          <div class="d-flex">
            <button
              type="button"
              class="btn btn-primary btnCircle mx-2 rounded-circle fs-4 text-white"
              @click="addCart(item, item.id)"
            >
              <i class="bi bi-cart-plus"/>
            </button>
            <button
              type="button"
              class="btn btn-primary btnCircle mx-2 rounded-circle fs-4 text-white"
              @click="removeFavortie(item, item.id)"
            >
              <i class="bi bi-trash"/>
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <img
          src="@/assets/images/guandam.jpg"
          alt="我的最愛"
          class="img-fluid d-none d-lg-block"
        />
      </div>
    </div>
  </div>
</template>

<script>
import favorite from '@/methods/favorite'

export default {
  data () {
    return {
      favortieProducts: [],
      favorite: favorite.getFavorite() || [],
      isLoading: false,
      status: {
        loadingItem: ''
      }
    }
  },
  inject: ['emitter'],
  methods: {
    getFavorite () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.favortieProducts = res.data.products.filter((item) =>
            this.favorite.includes(item.id)
          )
        }
        this.isLoading = false
      })
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
      // this.favorite.splice(this.favorite.indexOf(id), 1)
      // favorite.addToFavorite(this.favorite)
      // this.emitter.emit('update-favorite', this.favorite)
      // this.getFavorite()
    },
    getProduct (id) {
      this.$router.push(`/products/${id}`)
    },
    removeFavortie (item, id) {
      this.isLoading = true
      this.favorite.splice(this.favorite.indexOf(id), 1)
      favorite.addToFavorite(this.favorite)
      this.emitter.emit('update-favorite', this.favorite)
      this.$httpMessageState(
        {
          data: {
            success: true
          }
        },
        `將"${item.title}"移除我的最愛`
      )
      this.getFavorite()
    }
  },
  created () {
    this.getFavorite()
  }
}
</script>
