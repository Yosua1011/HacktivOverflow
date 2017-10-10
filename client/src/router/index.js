import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import QuestionsList from '@/components/QuestionsList'
import NewQuestion from '@/components/NewQuestion'
import QuestionDetail from '@/components/QuestionDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/newQuestion',
      component: NewQuestion
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          component: QuestionsList
        },
        {
          path: ':slug',
          component: QuestionDetail,
          props: true
        }
      ]
    }
  ]
})
