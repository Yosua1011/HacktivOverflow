<template>
  <div class="col-md-9">
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">{{detail.title}}
          <div style="text-align: right" v-if="loginstate === true">
            <button type="button" name="button"class="btn btn-warning">
              <span class=""></span> Edit
            </button>
            <button type="button" name="button"class="btn btn-warning" @click="deleteContent(detail._id)">
              <span class=""></span> Delete
            </button>
          </div>
        </h3>
      </div>
      <div class="panel-body">
        <div class="" style="text-align: left">
          <p>{{detail.author}}</p>
          <p>
            {{detail.question}}
          </p>
        </div>
        <div class="panel panel-primary" v-for="answer in detail.answers">
          <div class="panel-heading">
            <h3 class="panel-title text-left">Respon dari : {{answer.creator}}</h3>
          </div>
          <div class="panel-body text-left">
            {{answer.answer}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: ['slug'],
  data () {
    return {
      detail: '',
      loginstate: false
    }
  },
  methods: {
    ...mapActions([
      'deleteQuestion'
    ]),
    ...mapState([
      'log'
    ]),
    getDetail (slug) {
      console.log(slug)
      this.$http.get(`/questions/${slug}`)
      .then(({data}) => {
        console.log(data)
        this.detail = data[0]
      })
      .catch(err => console.log(err))
    },
    checkLogin () {
      if (localStorage.getItem('token') === null) {
        this.loginstate = false
      } else {
        this.loginstate = true
      }
    },
    deleteContent (id) {
      this.deleteQuestion(id)
    },
    showAlert (msg) {
      if (msg !== null) this.$swal(`${msg}`)
      // Use sweetalret2
    }
  },
  created () {
    this.getDetail(this.slug)
    this.checkLogin()
  },
  watch: {
    slug () {
      this.getDetail(this.slug)
    }
  }
}
</script>

<style lang="css">
</style>
