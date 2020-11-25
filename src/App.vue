<template>
  <div class="bg-gray-100 min-h-screen overflow-x-hidden w-full px-24">

    <div class="shadow-lg my-1 px-2 py-10 text-gray-900  bg-white w-full">
      <div class="flex items-center mx-12">
        <img alt="Vue logo" class="h-10 h-10 p-1 rounded-full bg-gray-200 mr-2" src="./assets/logo.png">
        <h3 class="text-sm font-semibold">#1MinuteMiracle</h3>

        <router-link to="/" class="mx-2 text-blue-500">Home</router-link>
        <router-link to="/generate" class="text-blue-500 mr-2">Generate Link</router-link>
        <router-link to="/logout" @click.prevent="logout" v-if="user" class="text-blue-500">
          {{ user.displayName ?? 'Guest' }} |
          Logout
        </router-link>

      </div>

      <div>
        <router-view></router-view>
      </div>

      <modal v-if="!user">
        <template v-slot:body>
          <login></login>
        </template>
      </modal>

    </div>

  </div>
</template>

<script>

import {auth} from "@/firebase";
import {mapGetters} from "vuex";
import Login from "@/components/Login";
import Modal from "@/components/Modal";

export default {
  name: 'App',
  components: {Modal, Login},
  created() {

  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$store.dispatch('fetchUser', null)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
}

body {
  margin: 0;
  padding: 0;
}

.router-link-active.router-link-exact-active {
  @apply text-red-500;
}
</style>
