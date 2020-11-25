<template>
  <div class="py-10 px-4">
    <h3 class="text-2xl font-bold text-white mb-2">Hello!</h3>
    <div v-if="type === 'signin'" class="mb-2 flex flex-col">
      <input type="email" placeholder="Email"
             class="bg-gray-600 px-2 py-1 mb-2  rounded-lg text-white inline-block w-full h-10" v-model="email">
      <input type="password" placeholder="Password"
             class="bg-gray-600 px-2 py-1  rounded-lg text-white inline-block w-full h-10" v-model="password">
    </div>

    <div v-else-if="type==='signup'" class="mb-2 flex flex-col">
      <input type="text" placeholder="Your name"
             class="bg-gray-600 px-2 py-1  rounded-lg text-white inline-block h-10" v-model="userName">
      <input type="email" placeholder="Email"
             class="my-2 bg-gray-600 px-2 py-1  rounded-lg text-white inline-block h-10" v-model="email">
      <input type="password" placeholder="Password"
             class="bg-gray-600 px-2 py-1  rounded-lg text-white inline-block h-10" v-model="password">
    </div>

    <div v-else class="mb-2">
      <!--        guest-->
      <input type="text" placeholder="Your name"
             class="bg-gray-600 px-2 py-1  rounded-lg text-white inline-block w-full h-10" v-model="userName">
    </div>

    <p class="text-red-500">{{ error }}</p>


    <div class="text-white flex justify-between mt-4">
      <button class="bg-blue-500 rounded-lg text-white px-2 py-1 mb-2" @click.prevent="guestSignIn">Start as guest
      </button>

      <div class="">
        <a href="#" :class="{'bg-green-500': type==='signin'}" class="mx-2 border-b rounded-full px-2 py-1"
           @click.prevent="signIn">Signin</a>
        <span>|</span>
        <a href="#" :class="{'bg-green-500': type==='signup'}" class="mx-2 border-b rounded-full px-2 py-1"
           @click.prevent="register">Signup</a>
      </div>
    </div>

    <div class="text-center mb-4">
      <h1 class="text-lg font-bold text-gray-400">OR</h1>
    </div>

    <div class="text-center">
      <button class="bg-red-500 rounded-lg text-white px-2 py-1" @click.prevent="signInWithGoogle">Continue with
        Google
      </button>
      <!--      <button class="bg-blue-500 rounded-lg text-white px-2 py-1 ml-2" @click.prevent="signIn">Continue with Facebook
            </button>-->
    </div>

    <div class="flex flex-col shadow-lg bg-gray-100 py-3 px-12 mt-6 rounded-lg">
      <div class="flex items-center justify-center">
        <img src="../assets/img/pic.jpg" alt="Profile pic" class="w-12 h-12 rounded-full"/>
        <h3 class="text-md font-medium text-gray-800 ml-3">@Shejadul Karim</h3>
      </div>
      <div class="flex-none my-3 text-center">
        <blockquote class="text-md text-justify font-semibold" v-html="motive"></blockquote>
      </div>
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
      userName: '',
      email: '',
      password: '',
      type: 'guest',
      error: '',
      motive: "Confidence is <b>kicking</b> your <b>special one</b> without <b>any fear of losing her</b>."
    }
  },
  computed: {
    stripedhtml() {
      let regex = /(<([^>]+)>)/ig;
      return this.motive.replaceAll(regex, "")
    }
  },
  mounted() {
    if (this.$route.query.motive && !this.$route.query.motive.toString.length) {
      this.motive = this.$route.query.motive
    }
  },
  methods: {
    signIn() {

      if (this.type !== 'signin') {
        this.type = 'signin'
        return
      }

      if (this.email !== '' && this.password !== '') {
        auth.signInWithEmailAndPassword(this.email, this.password)
            .then(data => {
              this.$store.dispatch('fetchUser', data)
              this.$store.dispatch('getUser', data)
            })
            .catch(error => {
              console.log(error)
            })
      } else {
        this.error = 'email and password required'
      }
    },
    register() {

      if (this.type !== 'signup') {
        this.type = 'signup'
        return
      }

      if (this.userName !== '' && this.email !== '' && this.password !== '') {
        auth.createUserWithEmailAndPassword(this.email, this.password)
            .then(user => {
              this.setUserName(user.user, this.userName)
            })
            .catch(err => {
              console.log(err)
            })
      } else {
        this.error = 'Name, Email and Password required'
      }
    },
    guestSignIn() {
      if (this.userName !== '') {
        auth.signInAnonymously()
            .then(data => {
              this.setUserName(data.user, this.userName)
            })
            .catch(err => {
              console.log(err)
            })
      } else {
        this.type = 'guest';
      }
    },
    signInWithGoogle() {
      auth.signInWithPopup(googleProvider)
          .then(data => {
            let name = data.displayName
            this.setUserName(data.user, name)
          })
          .catch(err => {
            console.log(err)
          })
    },
    async setUserName(user, name) {

      console.log('setUser', user)

      // create user profile object in userCollections
      await usersCollection.doc(user.uid).set({
        name: name
      })

      this.$store.dispatch('fetchUser', user)
      this.$store.dispatch('getUser', user)

    }
  }
}
</script>

<style scoped>

</style>