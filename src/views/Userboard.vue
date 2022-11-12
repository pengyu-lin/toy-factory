<!-- eslint-disable vue/multi-word-component-names -->

<template class="position-relative">
<UserNavbar></UserNavbar>
<div class="container-fluid mt-3">
    <ToastMessages></ToastMessages>
    <router-view/>
</div>
    <Footer></Footer>
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
  provide () {
    return {
      emitter
    }
  }
}
</script>
