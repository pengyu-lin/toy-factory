<!-- eslint-disable vue/multi-word-component-names -->

<template class="position-relative">
<UserNavbar></UserNavbar>
<div class="container-fluid mt-3">
    <ToastMessages></ToastMessages>
    <router-view/>
</div>
    <Footer></Footer>
    <div class="position-fixed start-0 bottom-0 p-3 text-strat" style="z-index:1000">
    <button type="button" class="btn btn-primary text-white rounded-circle fs-5" style="height:50px;width:50px" @click="scrollToTop">
      <i class="bi bi-arrow-up"></i>
    </button>
  </div>
</template>

<script>
import UserNavbar from '../components/UserNavbar.vue'
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    UserNavbar,
    ToastMessages,
    Footer
  },
  methods: {
    scrollToTop () {
      window.scrollTo({
        top: 0
      })
    }
  },
  provide () {
    return {
      emitter
    }
  }
}
</script>
