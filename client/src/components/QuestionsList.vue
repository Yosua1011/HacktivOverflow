<template>
  <div class="col-md-8">
    <question-summary/>
  </div>
</template>

<script>
import QuestionSummary from '@/components/QuestionSummary'
import { mapActions } from 'vuex'
// import NewQuestion from '@/components/NewQuestion'
export default {
  components: {
    // NewQuestion,
    QuestionSummary
  },
  methods: {
    ...mapActions([
      'getAllQuestions'
    ])
  },
  created () {
    this.getAllQuestions()
  }
}
</script>

<style lang="css">
</style>
