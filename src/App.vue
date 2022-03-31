<template>
  <div id="app">
    <b-navbar variant="dark" type="dark">
      <b-navbar-brand tag="h1" class="ms-2 mb-0">Test Task</b-navbar-brand>
      <b-navbar-nav class="ms-auto me-2">
        <b-button size="sm" class="my-2 my-sm-0" @click="logout">Logout</b-button>
      </b-navbar-nav>
    </b-navbar>
    <div class="container mt-3">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('setAuth')
  },
  methods: {
    logout() {
      this.$store.commit('logout')

    }
  }
}
</script>