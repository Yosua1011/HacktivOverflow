import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
// import QuestionsSummary from '@components/QuestionsSummary'
// import QuestionDetail from '@components/QuestionDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    //   children: [
    //     {
    //       path: '',
    //       component: QuestionsSummary
    //     },
    //     {
    //       path: 'slug',
    //       component: QuestionDetail,
    //       props: true
    //     }
    //   ]
    }
  ]
})
