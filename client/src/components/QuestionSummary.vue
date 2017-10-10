<template>
  <div>
    <div class="panel panel-primary" v-for="question in showQuestions">
      <div class="panel-heading">
        <h3 class="panel-title">{{ question.title }}</h3>
        <h3 class="panel-title">{{ question.author }}</h3>
      </div>
      <div class="panel-body">
        {{ question.question }}
        <div class="" style="text-align: right">
          <router-link :to="'/' + question.slug">
            <button type="button" name="button"class="btn btn-warning" >
              <span class="glyphicon glyphicon-eye-open"></span> View Detail
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: ['questions'],
  computed: {
    showQuestions () {
      return this.questionsdata()
    }
  },
  methods: {
    ...mapActions([
      'deleteQuestion'
    ]),
    ...mapState([
      'questionsdata'
    ])
  },
  created () {
    this.questionsdata()
  }
}
</script>

<style lang="css">
</style>
