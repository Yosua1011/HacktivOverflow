<template lang="html">
  <div class="container">
    <h1 class="text-center">{{ head }}</h1>
    <div class="row menu">
      <div class="col-md-6">
        <router-link :to="'/'">
          <button type="button" name="button" class="btn btn-primary">Dashboard</button>
        </router-link>
        <router-link :to="'/newQuestion'">
          <button type="button" name="button" class="btn btn-primary" v-if="loginstate === true">New Question</button>
        </router-link>
        <router-link :to="'/login'"><a class="btn btn-default" v-if="loginstate === false">Login</a></router-link>
        <button type="button" name="button" class="btn btn-danger" @click="doLogout" v-if="loginstate === true">Logout</button>
      </div>
    </div>
    <div class="row">
      <!-- <questions-list></questions-list> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'container',
  data () {
    return {
      head: `Hacktiv Overflow, Welcome ${localStorage.getItem('username')}`,
      loginstate: false
    }
  },
  // components: {
  //   QuestionsList,
  //   NewQuestion
  // },
  methods: {
    ...mapActions([
      'getUser'
    ]),
    ...mapState([
      'user'
    ]),
    doLogout () {
      localStorage.clear()
      this.loginstate = false
      this.$router.push('/')
      this.showAlert('Selamat anda sudah logout')
    },
    checkLogin () {
      if (localStorage.getItem('token') === null) {
        this.loginstate = false
      } else {
        this.loginstate = true
      }
    },
    showAlert (msg) {
      // Use sweetalret2
      this.$swal(`${msg}`)
    }
  },
  created () {
    this.checkLogin()
  }
}
</script>

<style lang="css">
.menu {
  padding: 16px 0;
}
</style>
