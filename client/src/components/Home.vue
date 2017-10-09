<template lang="html">
  <div class="">
    <button type="button" name="button" class="btn btn-danger" @click="doLogout">Logout</button>
  </div>
</template>

<script>
export default {
  methods: {
    doLogout () {
      localStorage.clear()
      this.$router.push('/')
    },
    checkLogin () {
      if (localStorage.getItem('token') === null) {
        this.$router.push('/')
      }
    }
  },
  created () {
    this.checkLogin()
  }
}
</script>

<style lang="css">
</style>
