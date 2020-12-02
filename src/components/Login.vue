<template>
  <div>
    <div class="py-10 px-4" v-if="!google">
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
               class="bg-gray-600 px-2 py-1  rounded-lg mb-2 text-white inline-block h-10" v-model="password">
        <div class="flex">
          <div class="mr-2 relative">
            <input type="text" placeholder="Face link https://"
                   class="bg-gray-600 px-2 py-1  rounded-lg text-white inline-block w-full h-10" v-model="faceLink">

            <a href="#" @click.prevent="selectFile"
               class=" bg-yellow-500 text-white px-2 py-2 rounded-r-lg absolute right-0 top-0 bottom-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
              </svg>
            </a>

            <input type="file" hidden @change="onFileSelect" ref="faceup" accept="image/*">

          </div>

          <div class="h-10 w-10" v-if="uploading">
            <h3 class="relative">
            <span
                class="w-10 h-10 rounded-full absolute border-4 inline-block text-yellow-500 font-bold text-xs flex justify-center items-center">
              <span>{{ progress }}%</span>
            </span>
              <span class="w-10 h-10 rounded-full absolute border-r-4 border-red-500 inline-block animate-spin"></span>
            </h3>
          </div>
          <img v-else :src="faceLinkUp" alt="!!"
               class=" text-red-400 text-center align-middle h-10 w-10 rounded-full border border-gray-300">

        </div>
      </div>

      <div v-else class="mb-2 flex flex-col">
        <!--        guest-->
        <input type="text" placeholder="Your name"
               class="mb-2 bg-gray-600 px-2 py-1  rounded-lg text-white inline-block w-full h-10" v-model="userName">

        <div class="flex">
          <div class="mr-2 relative">
            <input type="text" placeholder="Face link https://"
                   class="bg-gray-600 px-2 py-1  rounded-lg text-white inline-block w-full h-10" v-model="faceLink">

            <a href="#" @click.prevent="selectFile"
               class=" bg-yellow-500 text-white px-2 py-2 rounded-r-lg absolute right-0 top-0 bottom-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
              </svg>
            </a>

            <input type="file" hidden @change="onFileSelect" ref="faceup" accept="image/*">

          </div>

          <div class="h-10 w-10" v-if="uploading">
            <h3 class="relative">
            <span
                class="w-10 h-10 rounded-full absolute border-4 inline-block text-yellow-500 font-bold text-xs flex justify-center items-center">
              <span>{{ progress }}%</span>
            </span>
              <span class="w-10 h-10 rounded-full absolute border-r-4 border-red-500 inline-block animate-spin"></span>
            </h3>
          </div>
          <img v-else :src="faceLinkUp" alt="!!"
               class=" text-red-400 text-center align-middle h-10 w-10 rounded-full border border-gray-300">

        </div>

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

      <div class="flex flex-col shadow-lg bg-gray-100 py-3 px-12 mt-6 rounded-lg text-gray-500">
        <div class="flex items-center justify-center">
          <img src="../assets/img/pic.png" alt="Profile pic" class="w-12 h-12 rounded-full border border-gray-300"/>
          <h3 class="text-md font-medium ml-3">@Shejadul Karim</h3>
        </div>
        <div class="flex-none my-3 text-center">
          <blockquote class="text-md text-justify font-semibold" v-html="motive"></blockquote>
        </div>
      </div>

    </div>

    <div v-else class="py-10 px-4">
      <h3 class="text-lg text-white">Welcome {{ fireUser ? fireUser.name : '' }} !!</h3>
      <p class="text-yellow-500 mb-2 text-sm">We are using bellow information for our website.<br>You can customize here
        if you want
      </p>
      <div class="mb-2 flex flex-col">
        <input type="text" placeholder="Your name"
               class="mb-2 bg-gray-600 px-2 py-1  rounded-lg text-white inline-block w-full h-10" v-model="userName">

        <div class="flex">
          <div class="mr-2 relative">
            <input type="text" placeholder="Face link https://"
                   class="bg-gray-600 px-2 py-1  rounded-lg text-white inline-block w-full h-10" v-model="faceLink">

            <a href="#" @click.prevent="selectFile"
               class=" bg-yellow-500 text-white px-2 py-2 rounded-r-lg absolute right-0 top-0 bottom-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
              </svg>
            </a>

            <input type="file" hidden @change="onFileSelect" ref="faceup" accept="image/*">

          </div>

          <div class="h-10 w-10" v-if="uploading">
            <h3 class="relative">
            <span
                class="w-10 h-10 rounded-full absolute border-4 inline-block text-yellow-500 font-bold text-xs flex justify-center items-center">
              <span>{{ progress }}%</span>
            </span>
              <span class="w-10 h-10 rounded-full absolute border-r-4 border-red-500 inline-block animate-spin"></span>
            </h3>
          </div>
          <img v-else :src="faceLinkUp" alt="!!"
               class=" text-red-400 text-center align-middle h-10 w-10 rounded-full border border-gray-300">

        </div>

      </div>
      <div class="text-white flex justify-between mt-4">
        <button class="bg-blue-500 rounded-lg text-white px-2 py-1 mb-2" @click="googleContinue">Continue</button>
      </div>
    </div>
  </div>
</template>

<script>
import {auth, googleProvider, usersCollection, usersStorage} from "@/firebase";
import {v4 as uuidv4} from 'uuid'
import {mapGetters} from "vuex";

export default {
  name: "Login",
  data() {
    return {
      userName: '',
      email: '',
      password: '',
      type: 'guest',
      error: '',
      motive: "You're super <b>awesome</b>",
      face: '',
      faceLink: '',
      mime_type: '',
      cropedImage: '',
      autoCrop: false,
      selectedFile: '',
      image: '',
      dialog: false,
      files: '',
      uploadTask: '',
      uploading: false,
      progress: 0
    }
  },
  computed: {
    stripedhtml() {
      let regex = /(<([^>]+)>)/ig;
      return this.motive.replaceAll(regex, "")
    },
    faceLinkUp() {
      console.log("changed", this.faceLink)
      return this.faceLink !== '' ? this.faceLink : '/img/pic.78e96f0b.png'
    },
    ...mapGetters({
      google: 'google',
      user: 'user',
      fireUser: 'fireUser'
    })
  },
  created() {
    if (this.$route.query.motive && !this.$route.query.motive.toString.length) {
      this.motive = this.$route.query.motive
    }
  },

  watch: {
    uploadTask: function () {
      var _this = this
      this.uploadTask.on('state_changed', sp => {
            _this.progress = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
          },
          null,
          () => {
            this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              _this.faceLink = downloadURL
              _this.uploading = false
            })
          })
    }
  },
  methods: {
    uploadFile(file) {
      this.uploading = true
      let fileName = uuidv4() + '.' + file.name.split('.').pop();
      this.uploadTask = usersStorage.child(fileName).put(file)
    },
    selectFile() {
      this.$refs['faceup'].click()
    },
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
              this.setUserName(user.user, this.userName, this.faceLink)
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
              this.setUserName(data.user, this.userName, this.faceLink)
            })
            .catch(err => {
              console.log(err)
            })
      } else {
        this.type = 'guest';
        this.error = 'Name field required'
      }
    },

    googleContinue() {
      this.setUserName(this.user, this.userName, this.faceLink)
      this.$store.commit('SET_GOOGLE', false)
    },

    signInWithGoogle() {
      auth.signInWithPopup(googleProvider)
          .then(data => {
            this.userName = data.user.displayName
            this.faceLink = data.user.photoURL
            this.setUserName(data.user, data.user.displayName, data.user.photoURL)
          })
          .catch(err => {
            console.log(err)
          })
    },
    async setUserName(user, name, faceLink) {
      // create user profile object in userCollections
      await usersCollection.doc(user.uid).set({
        name: name,
        face: faceLink
      })

      this.$store.dispatch('fetchUser', user)
      this.$store.dispatch('getUser', user)
    },
    onFileSelect(e) {
      const file = e.target.files[0]
      this.uploadFile(file)
    },
    saveImage() {
      this.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL()
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData()
        formData.append('profile_photo', blob, 'name.jpeg')

      }, this.mime_type)
    },
  }
}
</script>

<style scoped>

</style>