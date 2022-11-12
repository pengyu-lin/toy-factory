<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container mt-5">
    <form class="row justify-content-center"
      @submit.prevent="signIn">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">後臺登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
            v-model="user.username"
          />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required
            v-model="user.password"
          />
        </div>

        <div class="d-flex justify-content-between align-items-center mt-4">
          <div>
          <router-link to="/" class="fs-5 fw-bold text-decoration-none"><i class="bi bi-arrow-left"></i>回到首頁</router-link>
          <p class="text-secondary">不是管理者嗎?</p>
          </div>
          <button class="btn btnStyle" type="submit">登入</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signIn () {
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data
            document.cookie = `hexToken=${token};expires=${new Date(expired)}`
            this.$router.push('/dashboard/products')
          }
        })
    }
  }
}
</script>
