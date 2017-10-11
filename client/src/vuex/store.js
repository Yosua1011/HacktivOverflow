import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

const state = {
  questionsdata: [],
  log: '',
  user: '',
  loginstate: false,
  head: null
}

const mutations = {
  questionsStateContent (state, payload) {
    console.log('mutations data ', payload)
    state.questionsdata = payload
  },
  newQuestionContent (state, payload) {
    console.log('new question unshift data ', payload)
    state.questionsdata.push(payload)
  },
  spliceQuestion (state, id) {
    let idx = state.questionsdata.findIndex((question) => question._id === id)
    state.questionsdata.splice(idx, 1)
  },
  errorLog (state, payload) {
    state.log = payload
  },
  setUser (state, payload) {
    state.user = payload
  }
}

const actions = {
  getAllQuestions ({commit}) {
    http.get('/questions')
    .then(({data}) => {
      console.log('data questions ', data)
      commit('questionsStateContent', data)
    })
    .catch(err => console.log(err))
  },
  postNewQuestion ({commit}, newData) {
    console.log(`ini data di postNewQuestion sebelum http ${JSON.stringify(newData)}`)
    http.post('/questions/post', {
      title: newData.title,
      question: newData.question
    }, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      console.log(`ini data di postNewQuestion `, data)
      // commit('newQuestionContent', data)
      router.push('/')
    })
    .catch(err => console.log(err))
  },
  deleteQuestion ({commit}, id) {
    console.log('question dengan akan di delete dengan id ', id)
    http.delete(`/questions/${id}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      console.log(data)
      if (data.message !== null) {
        console.log(`${JSON.stringify(data)} ini kedelete`)
        commit('spliceQuestion', id)
        router.push('/')
      } else {
        this.showAlert(data.message)
      }
    })
    .catch(err => commit('errorLog', err.message))
  },
  showAlert (msg) {
    if (msg !== null) this.$swal(`${msg}`)
    // Use sweetalret2
  },
  getUser ({commit}, token) {
    http.post(`/pemecahtoken`, {
      token: token
    })
    .then(({data}) => {
      console.log(`ini data dari getUser ${data.username}`)
      localStorage.setItem('username', data.username)
      commit('setUser', {user: data, token: token})
    })
    .catch(err => console.log(err))
  },
  editQuestion ({commit}, question) {
    http.put(`/questions/${question.id}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      console.log('Sukses keedit')
    })
    .catch(err => console.log(err))
  }
}

const store = new Vuex.Store({
  state, mutations, actions
})

export default store
