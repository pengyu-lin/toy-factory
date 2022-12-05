<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Loading :active="isLoading"></Loading>
  <header class="container pt-3">
    <div class="text-center header px-4 py-5">
      <div class="text-white text-center p-3 cover d-inline-block">
        <p class="mb-0">步入玩具世界，尋找快樂源泉！</p>
        <h1 class="fw-bold my-3">玩出自己的世界!</h1>
        <p class="mb-0">在這裡，年齡不是界限，快樂才是追求。</p>
      </div>
    </div>
  </header>

  <section class="container py-5">
    <h2 class="text-center lh-lg">—— 主要服務項目 ——</h2>
    <div class="row row-cols-1 row-cols-md-3">
      <div class="col">
        <div class="card border-0 animated" :class="{ fadeIn: animation.special }">
          <div class="card-body text-center">
            <h5 class="card-title fs-1"><i class="bi bi-globe"></i></h5>
            <h5 class="card-title fw-bold">優質的玩具</h5>
            <p class="card-text">
              我們販售的玩具都是經過精挑細選的，絕對品質保證!讓您買的安心、玩得開心。
            </p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card border-0 animated" :class="{ fadeIn: animation.special }" style="transition: all 1.5s 0.3s;">
          <div class="card-body text-center">
            <h5 class="card-title fs-1"><i class="bi bi-truck"></i></h5>
            <h5 class="card-title fw-bold">快速的出貨</h5>
            <p class="card-text">
              我們有與「白貓宅急便」合作，每當收到訂單，將會安全的以最快的時間將玩具送到您手裡!
            </p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card border-0 animated" :class="{ fadeIn: animation.special }" style="transition: all 1.5s 0.6s;">
          <div class="card-body text-center">
            <h5 class="card-title fs-1"><i class="bi bi-people"></i></h5>
            <h5 class="card-title fw-bold">完善的服務</h5>
            <p class="card-text">
              我們提供完善的售後服務。不論有甚麼相關的問題，都可以聯絡<a href="mailto:toy-factory@support.com" class="text-decoration-none">客服信箱</a>，將會有專人為您服務!
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="container py-5">
    <div
      class="row flex-row-reverse g-3 animated"
      :class="{ fadeIn: animation.first }"
    >
      <div class="col-lg-6 d-flex align-items-center">
        <div>
          <h2 class="fw-bold">你玩我也玩<br />大家一起玩才是真的好玩！</h2>
          <p class="lh-lg text-secondary mb-0">
            誰說玩具只有小朋友能玩呢?<br />玩具工坊提供各式各樣的玩具，從玩偶、積木到模型應有盡有。不只小朋友喜歡，大人也愛!一起來玩玩具吧~
          </p>
          <p class="text-end text-secondary">一「每個人心中都住著一個孩子」</p>
          <button
            type="button"
            class="btn btnStyle"
            @click.prevent="this.$router.push('/products')"
          >
            買玩具去~
          </button>
        </div>
      </div>
      <div class="col-lg-6">
        <img src="../assets/images/legoman.jpg" alt="" class="w-100" />
      </div>
    </div>
  </section>

  <section class="py-3">
    <div class="container">
      <div class="d-flex justify-content-between">
        <h3><i class="bi bi-star-fill text-warning"></i> 精選玩具</h3>
        <a
          href="#"
          class="text-decoration-none fs-5 text-end fw-bold"
          @click.prevent="this.$router.push('/products')"
          >更多玩具<i class="bi bi-arrow-right"></i
        ></a>
      </div>
      <swiper
        :slidesPerView="4"
        :spaceBetween="30"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
        }"
        :loop="true"
        :modules="modules"
        :breakpoints="{
          '0': {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          '576': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '768': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '992': {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          '1200': {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }"
        class="mySwiper"
      >
        <swiper-slide
          v-for="item in randomProducts"
          :key="item.id"
          class="h-auto"
        >
          <div class="card h-100 border overflow-hidden">
            <img
              :src="item.imageUrl"
              class="card-img-top img-fluid"
              alt=""
              style="object-fit: cover; height: 200px; cursor: pointer"
              @click="getProduct(item.id)"
            />
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <div class="d-flex justify-content-between align-items-center">
                  <h5 class="card-title fw-bold text-primary mb-0">
                    {{ item.title }}
                  </h5>
                  <span class="badge bg-warning rounded-pill text-black">
                    {{ item.category }}</span
                  >
                </div>
                <hr />
                <p class="card-text">{{ item.description }}</p>
              </div>
              <div>
                <div class="text-end">
                  <p class="h5" v-if="item.price === item.origin_price">
                    {{ $filters.currency(item.origin_price) }} 元
                  </p>
                  <del
                    class="h6 text-danger"
                    v-if="item.price !== item.origin_price"
                    >原價 {{ $filters.currency(item.origin_price) }} 元</del
                  >
                  <p class="h5" v-if="item.price !== item.origin_price">
                    現在只要 {{ $filters.currency(item.price) }} 元
                  </p>
                </div>
                <div class="text-end">
                  <button
                    class="btn btn-primary btnCircle mx-2 rounded-circle fs-4 text-white"
                    :disabled="this.status.loadingItem === item.id"
                    @click.prevent="addCart(item, item.id)"
                  >
                    <i class="bi bi-cart3"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>

  <section class="container py-5">
    <div class="coupon d-flex align-items-center justify-content-end overflow-hidden">
      <div
        class="text-center p-lg-5 p-3 animatedRight"
        :class="{ fadeInX: animation.second }"
      >
        <h2 class="fs-1 fw-bold">
          <i class="bi bi-balloon-fill text-danger"></i>開幕優惠<i
            class="bi bi-balloon-fill text-danger"
          ></i>
        </h2>
        <p class="fs-3">
          歡慶開幕!<br class="d-lg-none" />
          輸入優惠碼"<span class="text-danger fw-bold">toy777</span>"<br
            class="d-lg-none"
          />享7折優惠!
        </p>
        <button type="button" class="btn btnStyle" @click="copy">
          立即領取
        </button>
      </div>
    </div>
  </section>

  <section class="container pb-5 py-3">
    <div
      class="subscribe d-flex align-items-center p-5 row-cols-1 row-cols-md-2"
    >
      <div
        class="col p-md-4 animatedLeft"
        :class="{ fadeInX: animation.third }"
      >
        <h3>馬上訂閱「玩具工坊」<br />獲得最新的玩具和優惠資訊!</h3>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control lh-lg"
            placeholder="請輸入Email"
          />
          <button class="btn btn-dark" type="button">訂閱</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'

export default {
  data () {
    return {
      products: [],
      randomProducts: [],
      isLoading: false,
      status: {
        loadingItem: ''
      },
      animation: {
        special: false,
        first: false,
        second: false,
        third: false
      }
    }
  },
  inject: ['emitter'],
  components: {
    Swiper,
    SwiperSlide
  },
  setup () {
    return {
      modules: [Autoplay]
    }
  },
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.products = res.data.products
          this.getRandomProducts()
        }
      })
    },
    getProduct (id) {
      this.$router.push(`/products/${id}`)
    },
    copy () {
      navigator.clipboard.writeText('toy777')
      alert('已複製優惠碼!')
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
        this.isLoading = false
        this.status.loadingItem = ''
        console.log(res)
        this.$httpMessageState(res, `將"${item.title}"加入購物車`)
        this.emitter.emit('update-cart', id)
      })
    },
    getRandomProducts () {
      this.randomProducts = this.products.sort(() => Math.random() - 0.5)
      this.randomProducts.splice(0, parseInt(this.randomProducts.length) - 6)
    },
    handleScroll () {
      this.animation.special = window.scrollY > 100
      this.animation.first = window.scrollY > 400
      this.animation.second = window.scrollY > 1400
      this.animation.third = window.scrollY > 1700
    }
  },
  created () {
    this.getProducts()
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>
