import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index'

Vue.use(Vuex)

import axios from 'axios'
const http = axios.create({
  baseURL: 'https://reqres.in/api',
  timeout: 10000,
});

export default new Vuex.Store({
  state: {
    auth: false,
    token: '',
    error: ''
  },
  mutations: {
    setAuth(state) {
      state.auth = localStorage.getItem('auth')
      state.token = localStorage.getItem('token')
    },
    logout(state) {
      state.auth = false
      state.token = ''
      localStorage.clear()
      router.push('/login')
    }
  },
  actions: {
    login({state}, payload) {
      http.post('/login', payload)
        .then(res => {
          localStorage.setItem('auth', 'true')
          localStorage.setItem('token', res.data.token)
          state.auth = true
          state.token = res.data.token
          router.push({name: 'Users'})
        })
        .catch(() => {
          state.error = 'Incorrect email or password!'
        }) 
    },
    getAllUsers(_, query) {
      let data = http.get('/users' + query)
        .then(res => data = res.data)
      return data
    },
    getUser(_, id) {
      let data = http.get('/users/' + id)
        .then(res => data = res.data)
      return data
    },
    deleteUser(_, id) {
      let data = http.delete('/users/' + id)
        .then(res => data = res.data)
      return data
    },
    createUser(_, payload) {
      let data = http.post('users', payload)
        .then(res => data = res.data)
      return data
    },
    editUser(_, payload) {
      let data = http.put('users', payload)
        .then(res => data = res.data)
      return data
    }
  },
  modules: {
  }
})
