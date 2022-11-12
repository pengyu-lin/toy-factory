<!-- eslint-disable vue/multi-word-component-names -->
<template v-if="cart.carts">
<Loading :active="isLoading"></Loading>
    <div class="container py-5">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
          <li class="breadcrumb-item">購物車</li>
        </ol>
      </nav>
        <h2><i class="bi bi-cart3 fs-3"></i> 購物車</h2>
        <hr>
        <div class="text-center" :class="{'d-none':cart.total!==0}">
          <i class="bi bi-cart4" style="font-size:150px"></i>
          <p class="fs-2">購物車是空的，來去逛逛吧!</p>
          <button type="button" class="btnStyle" @click="this.$router.push('/products')">選玩具</button>
        </div>
      <div class="row">
        <div class="col-lg-8">
          <div class="border border-primary d-flex flex-column flex-md-row justify-content-around align-items-center p-3 mb-3 text-center" v-for="item in cart.carts" :key="item.id">
              <img :src="item.product.imageUrl" class="productImg" alt="">
              <p class="h5 pt-3 pt-md-0">{{item.product.title}}</p>
              <div class="input-group" style="width:150px">
                    <button
                          type="button"
                          class="btn btn-outline-dark"
                          @click="updateCart(item, item.qty - 1)"
                          :disabled="item.qty == 1"
                        >
                          <i class="bi bi-dash" />
                        </button>
                        <input
                          type="text"
                          min="1"
                          v-model.number="item.qty"
                          class="form-control form-control-sm text-center border-dark"
                          readonly
                        />
                        <button
                          type="button"
                          class="btn btn-outline-dark"
                          @click="updateCart(item, item.qty + 1)"
                        >
                          <i class="bi bi-plus" />
                        </button>
                  </div>
                  <p>NT{{$filters.currency(item.final_total)}}</p>
                <button type="button" class="btn btn-primary btnCircle mx-2 rounded-circle fs-4 text-white" @click="removeCartItem(item.id)"><i class="bi bi-trash"></i></button>
            </div>
        </div>
        <div class="col-lg-4" :class="{'d-none':cart.total===0}">
          <div class="border border-primary p-3">
            <div class="d-flex justify-content-between">
              <p>商品共計:</p>
              <p>{{ $filters.currency(cart.total) }}</p>
            </div>
            <div class="input-group mb-3">
              <input type="text" class="form-control lh-lg border-dark" v-model="coupon_code" placeholder="輸入優惠碼">
              <button class="btn btn-dark" type="button" @click="addCouponCode">套用</button>
            </div>
            <div class="d-flex justify-content-between" v-if="cart.final_total === cart.total">
              <p>合計:</p>
              <p>{{ $filters.currency(cart.final_total) }}</p>
            </div>
            <p class="text-success" v-if="cart.final_total !== cart.total">已套用優惠券</p>
            <div class="d-flex justify-content-between text-success" v-if="cart.final_total !== cart.total" >
              <p>折扣價：</p>
              <p>{{ $filters.currency(cart.final_total) }}</p>
            </div>
            <button type="button" class="btn btnStyle w-100" @click="this.$router.push('/checkout')" :class="{'disabled': cart.total===0 }">結帳去</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      cart: {},
      coupon_code: '',
      status: {
        loadingItem: ''
      },
      isLoading: false
    }
  },
  inject: ['emitter'],
  methods: {
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        this.cart = response.data.data
        this.isLoading = false
      })
    },
    updateCart (item, qty = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.isLoading = true
      this.status.loadingItem = item.id
      const cart = {
        product_id: item.product_id,
        qty
      }
      this.$http.put(url, { data: cart }).then((res) => {
        this.status.loadingItem = ''
        this.getCart()
        this.isLoading = false
      })
    },
    removeCartItem (id) {
      this.status.loadingItem = id
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoading = true
      this.$http.delete(url).then((response) => {
        this.$httpMessageState(response, '移除購物車品項')
        this.status.loadingItem = ''
        this.getCart()
        this.isLoading = false
        this.emitter.emit('update-cart', id)
      })
    },
    addCouponCode () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      const coupon = {
        code: this.coupon_code
      }
      this.isLoading = true
      this.$http.post(url, { data: coupon }).then((response) => {
        this.$httpMessageState(response, '加入優惠券')
        this.getCart()
        this.isLoading = false
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style lang="scss">
.btnCircle {
  &:hover{
    color:white;
    background-color: #f3acc2;
    border-color: #f3acc2;
  }
}
</style>
