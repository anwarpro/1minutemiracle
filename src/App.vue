<template>
  <div
      class="max-h-screen h-screen overflow-x-hidden bg-gradient-to-r from-gray-start to-gray-end px-3 py-2  md:px-12 md:py-16">

    <!--    <div class="absolute left-0 right-0 bottom-0">
          <svg class="text-gray-start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="currentColor" fill-opacity="1"
                  d="M0,192L18.5,213.3C36.9,235,74,277,111,250.7C147.7,224,185,128,222,112C258.5,96,295,160,332,160C369.2,160,406,96,443,112C480,128,517,224,554,240C590.8,256,628,192,665,149.3C701.5,107,738,85,775,101.3C812.3,117,849,171,886,160C923.1,149,960,75,997,37.3C1033.8,0,1071,0,1108,42.7C1144.6,85,1182,171,1218,197.3C1255.4,224,1292,192,1329,154.7C1366.2,117,1403,75,1422,53.3L1440,32L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"></path>
          </svg>
        </div>-->

    <main
        class="flex flex-col shadow-2xl bg-red-500 h-full bg-gradient-to-r from-purple-start to-purple-end rounded-xl"
    >
      <header class="flex flex-col md:flex-row md:py-6 md:px-16 py-2 px-2 justify-between">
        <!--        logo-->
        <div class="flex md:justify-around justify-center items-center">
          <div class="text-white">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
              <path
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
            </svg>
          </div>
          <div class="ml-1">
            <h3 class="text-2xl font-semibold text-white">1 Minute Miracle</h3>
          </div>
        </div>

        <!--        navigation-->
        <div class="md:mt-0 mt-1">
          <nav class="text-white flex justify-center items-center">
            <router-link to="/" class="mr-2 border-b font-bold">Home</router-link>
            <span v-if="user" class="mr-2">|</span>
            <router-link to="/" class="mr-2 border-b font-bold" v-if="user" @click.prevent="logout">Logout</router-link>
            <router-link v-if="fireUser && fireUser.type === 'admin'" to="/generate"
                         class="md:ml-4 md:text-md text-sm bg-gray-100 inline-block px-2 py-1 rounded-full text-purple-500">
              Generate Link
            </router-link>
          </nav>
        </div>
      </header>
      <section class="flex justify-center flex-1">
        <login v-if="!user"></login>
        <router-view v-else></router-view>
      </section>
    </main>
  </div>
</template>

<script>

import {auth} from "@/firebase";
import {mapGetters} from "vuex";
import Login from "@/components/Login";

export default {
  name: 'App',
  components: {Login},
  created() {

  },
  computed: {
    ...mapGetters({
      user: 'user',
      fireUser: 'fireUser'
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
