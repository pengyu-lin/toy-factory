<template>
<Loading :active="isLoading"></Loading>
    <section class="container py-5">
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
        <div class="row g-4 justify-content-around pt-5">
            <div class="col-lg-2">
              <div class="text-center text-lg-start d-flex flex-column">
                <button type="button" class="m-2 category py-2"
                :class="{ 'active' : this.category === item.value}"
                @click.prevent="this.category=item.value" v-for="item in categoryList" :key="item.value">{{item.value}}</button>
            </div>
          </div>
          <div class="col-lg-9">
            <div class="row row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4">
              <div class="col" v-for="item in filterProducts" :key="item.id">
                <div class="card h-100 border-0 overflow-hidden shadow">
                  <img :src="item.imageUrl" class="card-img-top img-fluid" style="object-fit:cover; height: 200px;cursor:pointer" :alt="item.title" :title="item.title" @click="getProduct(item.id)">
                  <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                    <h5 class="card-title fw-bold text-primary">{{item.title}}</h5>
                    <hr>
                    <p class="card-text">{{item.description}}</p>
                    </div>
                    <div>
                      <div class="text-end">
                      <p class="h5" v-if="item.price===item.origin_price">{{ $filters.currency(item.origin_price) }} 元</p>
                      <del class="h6" v-if="item.price!==item.origin_price">原價 {{ $filters.currency(item.origin_price) }} 元</del>
                      <p class="h5 text-danger" v-if="item.price!==item.origin_price">特價 {{ $filters.currency(item.price) }} 元</p>
                      </div>
                      <div class="text-end">
                        <button type="button" class="btn btn-primary btnCircle mx-2 rounded-circle fs-4 text-white" :class="{'active':this.favorite.includes(item.id)}" style="width:50px;height:50px;" @click="toggleFavorite(item)"><i class="bi bi-suit-heart"></i></button>
                        <button type="button" class="btn btn-primary btnCircle align-self-end rounded-circle fs-4 text-white" style="width:50px;height:50px;" :disabled="this.status.loadingItem === item.id" @click="addCart(item.id)">
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
import favorite from '@/methods/favorite'

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
      },
      favorite: favorite.getFavorite() || []
    }
  },
  inject: ['emitter'],
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
      this.isLoading = true
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: 1
      }
      this.$http.post(url, { data: cart })
        .then((res) => {
          this.isLoading = false
          this.status.loadingItem = ''
          this.$httpMessageState(res, '加入購物車')
          this.emitter.emit('update-cart', id)
        })
    },
    toggleFavorite (item) {
      this.isLoading = true
      if (this.favorite.includes(item.id)) {
        this.favorite.splice(this.favorite.indexOf(item.id), 1)
      } else {
        this.favorite.push(item.id)
      }
      this.isLoading = false
      favorite.addToFavorite(this.favorite)
      this.emitter.emit('update-favorite', this.favorite)
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

<style lang="scss">
  .category{
    background-color: #c5e8e8;
    border: 0 solid #E5E7EB;
    box-sizing: border-box;
    color: #000000;
    display: flex;
    font-family: ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 1rem;
    font-weight: 700;
    justify-content: center;
    line-height: 1.75rem;
    padding: .75rem 1.65rem;
    position: relative;
    text-align: center;
    text-decoration: none #000000 solid;
    text-decoration-thickness: auto;
    width: 100%;
    max-width: 460px;
    position: relative;
    cursor: pointer;
    transform: rotate(-2deg);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  &:focus {
  outline: 0;
  };
  &:after {
  content: '';
  position: absolute;
  border: 1px solid #000000;
  bottom: 4px;
  left: 4px;
  width: calc(100% - 1px);
  height: calc(100% - 1px);
};
&:hover:after {
  bottom: 2px;
  left: 2px;
};
&.active{
  background-color:#f1e4b8
}
  }
.card-img-top:hover {
  transform:scale(1.1);
  transition-duration: 500ms;
}

</style>
