<!-- eslint-disable vue/multi-word-component-names -->
<template>
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
      <div class="row flex-row-reverse g-3">
        <div class="col-lg-6 d-flex align-items-center">
          <div>
            <h2 class="fw-bold">你玩我也玩<br>大家一起玩才是真的好玩！</h2>
            <p class="lh-lg text-secondary mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Est voluptatum vel fuga quos molestiae velit, eaque impedit dicta adipisci voluptas consectetur, hic voluptates ut perferendis nesciunt soluta eligendi nulla natus, tempora temporibus accusamus rem nobis reprehenderit nam? Ea, molestias tenetur!</p>
            <button type="button" class="btn btn-primary" @click.prevent="this.$router.push('/products')">買玩具去~</button>
          </div>
        </div>
        <div class="col-lg-6"><img src="../assets/images/legoman.jpg" alt="" class="w-100"></div>
      </div>
    </section>

    <section class="py-3">
      <div class="container">
        <div class="d-flex justify-content-between">
          <h3><i class="bi bi-hand-thumbs-up"></i> 精選玩具</h3>
          <a href="#" class="text-decoration-none fs-5 text-end" @click.prevent="this.$router.push('/products')">更多玩具<i class="bi bi-arrow-right-short"></i></a>
        </div>
        <div class="row row-cols-lg-4 row-cols-1 row-cols-md-2 g-3 g-lg-4">
          <div class="col" v-for="item in filterProducts" :key="item.id">
            <div class="card h-100">
              <img :src="item.imageUrl" class="card-img-top img-fluid" alt="blocks" style="object-fit:cover; height: 200px;cursor:pointer" @click="getProduct(item.id)">
              <div class="card-body d-flex flex-column justify-content-between">
                <div>
                <h5 class="card-title">{{item.title}}</h5>
                <p class="card-text">{{item.description}}</p>
                </div>
                <div class="text-end">
                  <a href="#" class="btn btn-primary mx-2"><i class="bi bi-suit-heart"></i></a>
                  <a href="#" class="btn btn-primary"><i class="bi bi-cart3"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="container py-5">
      <div class="coupon d-flex align-items-center justify-content-end">
        <div class="text-center p-lg-5 p-3">
          <h2 class="fs-1 fw-bold"><i class="bi bi-balloon-fill text-danger"></i>開幕優惠<i class="bi bi-balloon-fill text-danger"></i></h2>
          <p class="fs-3">歡慶開幕!<br class="d-lg-none"> 輸入優惠碼"<span class="text-danger fw-bold">toy777</span>"<br class="d-lg-none">享7折優惠!</p>
          <button type="button" class="btn btn-primary" @click="copy">立即領取</button>
        </div>
      </div>
    </section>

    <section class="container py-3">
      <div class="subscribe d-flex align-items-center p-5 row-cols-1 row-cols-md-2">
          <div class="col p-4">
            <h3 class="text-nowrap">馬上訂閱「玩具工坊」<br>獲得最新的玩具和優惠資訊!</h3>
            <div class="input-group mb-3">
              <input type="text" class="form-control lh-lg" placeholder="請輸入Email">
              <button class="btn btn-dark" type="button">訂閱</button>
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
      isLoading: false
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
            this.products = res.data.products
          }
        })
    },
    getProduct (id) {
      this.$router.push(`/products/${id}`)
    },
    copy () {
      navigator.clipboard.writeText('toy777')
      alert('已複製優惠碼!')
    }
  },
  computed: {
    filterProducts () {
      return this.products.filter(item => {
        return item.category.match('精選玩具')
      })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
