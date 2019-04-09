import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'
import BookedTrades from './components/BookedTrades'
import NewTrade from './components/NewTrade'
import axios from 'axios'
import './filters'


axios.defaults.baseURL = 'http://localhost:8000/api/v1/'
Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  {
    name: 'bookedTrades',
    path: '/',
    component: BookedTrades
  },
  {
    name: 'newTrade',
    path: '/new-trade/',
    component: NewTrade
  }
]
const router = new VueRouter({
  routes // short for `routes: routes`
})



new Vue({
  router,
      components: { App },
    template: "<App/>",
  render: h => h(App),
}).$mount('#app')
