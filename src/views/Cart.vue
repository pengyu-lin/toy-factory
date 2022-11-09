<!-- eslint-disable vue/multi-word-component-names -->
<template v-if="cart.carts">
    <div class="container py-5">
      <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
        <li class="breadcrumb-item">購物車</li>
      </ol>
    </nav>
        <h2>購物車</h2>
        <hr>
        <div class="text-center" :class="{'d-none':cart.total!==0}">
          <i class="bi bi-cart4" style="font-size:150px"></i>
          <p class="fs-2">購物車是空的，來去逛逛吧!</p>
          <button type="button" class="btn btn-primary" @click="this.$router.push('/products')">選玩具</button>
        </div>
      <div class="row">
        <div class="col-md-8">
          <table class="table align-middle">
            <thead>
              <tr :class="{'d-none':cart.total===0}">
                <th class="d-md-table-cell d-none">縮圖</th>
                <th>產品名稱</th>
                <th>數量</th>
                <th>價格</th>
                <th>刪除</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <td class="d-md-table-cell d-none"><img :src="item.product.imageUrl" alt="" style="width:150px"></td>
                <td>{{ item.product.title }}</td>
                <td style="width:100px"><div class="input-group input-group-sm">
                    <input type="number" class="form-control" min="1"
                    :disabled="item.id === status.loadingItem"
                          @change="updateCart(item)"
                          v-model.number="item.qty">
                    <div class="input-group-text">/ {{ item.product.unit }}</div>
                  </div></td>
                <td>{{$filters.currency(item.final_total)}}</td>
                <td>
                  <a href="#" class="text-danger fs-4" @click.prevent="removeCartItem(item.id)"><i class="bi bi-trash"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-md-4" :class="{'d-none':cart.total===0}">
          <div class="border p-3">
            <div class="d-flex justify-content-between">
              <p>商品共計:</p>
              <p>{{ $filters.currency(cart.total) }}</p>
            </div>
            <div class="input-group mb-3">
              <input type="text" class="form-control lh-lg" v-model="coupon_code" placeholder="輸入優惠碼">
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
            <button type="button" class="btn btn-primary w-100" @click="this.$router.push('/checkout')" :class="{'disabled': cart.total===0 }">結帳去</button>
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
      }
    }
  },
  methods: {
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        console.log(response)
        this.cart = response.data.data
        this.isLoading = false
      })
    },
    updateCart (item) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.isLoading = true
      this.status.loadingItem = item.id
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(url, { data: cart }).then((res) => {
        console.log(res)
        this.status.loadingItem = ''
        this.getCart()
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
