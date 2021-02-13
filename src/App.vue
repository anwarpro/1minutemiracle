<template>
  <div
      class="min-h-screen overflow-x-hidden bg-gradient-to-r from-gray-start to-gray-end px-3 py-2  md:px-12 md:py-16"
  >

    <main
        class="flex flex-col shadow-2xl bg-red-500 h-full bg-gradient-to-r from-purple-start to-purple-end rounded-xl pb-12"
    >
      <header class="flex flex-col md:flex-row md:py-6 md:px-16 py-2 px-2 justify-between">
        <!--        logo-->
        <div class="flex md:justify-around justify-center items-center">
          <div class="text-white">
            <img src="./assets/ph_love.png" class="h-16" alt="logo">
          </div>
          <!--          <div class="ml-1">
                      <h3 class="text-2xl font-semibold text-white">Hero Valentines</h3>
                    </div>-->
        </div>

        <!--        navigation-->
        <div class="md:mt-0 mt-1">
          <nav class="text-white flex justify-center items-center">
            <router-link to="/" class="mr-2 border-b font-bold">Home</router-link>

            <span v-if="fireUser && fireUser.type === 'admin'" class="mr-2">|</span>
            <router-link v-if="fireUser && fireUser.type === 'admin'" to="/my-miracles" class="mr-2 border-b font-bold">
              Miracles
            </router-link>

            <span v-if="user" class="mr-2">|</span>
            <router-link to="/" class="mr-2 border-b font-bold" v-if="user" @click.prevent="logout">Logout</router-link>
            <router-link v-if="fireUser && fireUser.type === 'admin'" to="/generate"
                         class="md:ml-4 md:text-md text-sm bg-gray-100 inline-block px-2 py-1 rounded-full text-purple-500">
              Generate
            </router-link>
          </nav>
        </div>
      </header>
      <section class="flex justify-center flex-1">
        <login v-if="!user || google"></login>
        <router-view v-else></router-view>
      </section>
    </main>
  </div>
</template>

<script>

import {analytics, auth} from "@/firebase";
import {mapGetters} from "vuex";
import Login from "@/components/Login";

export default {
  name: 'App',
  components: {Login},
  created() {
    analytics.logEvent("notification_received")
  },
  computed: {
    ...mapGetters({
      user: 'user',
      fireUser: 'fireUser',
      google: 'google'
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
}

.router-link-active.router-link-exact-active {

}
</style>
