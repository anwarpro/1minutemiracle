<template>
  <div class="py-48 px-48">
    <div class="mb-10">
      <input type="text" placeholder="Your name"
             class="bg-gray-600 px-2 py-1  rounded-lg text-white inline-block mb-5 h-10" v-model="userName">
      <img src="../assets/img/pic.jpg" class="h-12 w-12 rounded-full">
    </div>
    <button class="bg-gray-600 rounded-lg text-white px-2 py-1 mb-2" @click.prevent="guestSignIn">Continue as guest
    </button>
    <div class="">
      <button class="bg-red-500 rounded-lg text-white px-2 py-1" @click.prevent="signInWithGoogle">Continue with
        Google
      </button>
      <button class="bg-blue-500 rounded-lg text-white px-2 py-1 ml-2" @click.prevent="signIn">Continue with Facebook
      </button>
    </div>
  </div>
</template>

<script>
import {auth, googleProvider, usersCollection} from "@/firebase";

export default {
  name: "Login",
  data() {
    return {
      user: '',
      userName: ''
    }
  },
  methods: {
    signIn() {
      auth.signInWithEmailAndPassword('anwar.hussen.pro@gmail.com', '34722645')
          .then(data => {
            console.log("signin", data)
          })
          .catch(error => {
            console.log(error)
          })
    },
    guestSignIn() {
      auth.signInAnonymously()
          .then(data => {
            usersCollection.doc(data.uid).set({name: this.userName}).then(() => {
              this.$store.dispatch('fetchUser', data)
            })
          })
          .catch(err => {
            console.log(err)
          })
    },
    signInWithGoogle() {
      auth.signInWithPopup(googleProvider)
          .then(data => {
            usersCollection.doc(data.uid).set({name: this.userName}).then(() => {
              this.$store.dispatch('fetchUser', data)
            })
          })
          .catch(err => {
            console.log(err)
          })
    }
  }
}
</script>

<style scoped>

</style>