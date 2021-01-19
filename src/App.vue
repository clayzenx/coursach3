<template>
  <the-navbar></the-navbar>
  <div class="container with-nav">
    <router-view />
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar'
import { useStore } from 'vuex'
import { onMounted } from 'vue'

export default {
  components: { TheNavbar },
  setup(){
    const store = useStore()

    onMounted(() => {
      store.dispatch('fetchTodos')
    })
  }
}
</script>

<style>

</style>
