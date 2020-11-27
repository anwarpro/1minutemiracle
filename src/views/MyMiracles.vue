<template>
  <div class="text-white mt-4 w-full">
    <h3 class="text-md font-bold mx-4 md:mx-12">My Miracles</h3>

    <div class="my-10 text-center" v-if="miracles.length === 0">
      <div v-if="loading" class="text-center">
        <h3 class="relative">
          <span class="w-10 h-10 rounded-full absolute border-4 inline-block"></span>
          <span class="w-10 h-10 rounded-full absolute border-r-4 border-red-500 inline-block animate-spin"></span>
        </h3>
      </div>
      <div v-else>
        <h3 class="mb-2">No miracle in your jar</h3>
        <router-link to="/generate" class="bg-red-400 rounded-full px-4 py-1">Create one</router-link>
      </div>
    </div>
    <table class="mx-2 my-2 md:mx-12 w-11/12" v-else>
      <thead>
      <tr class="border-b">
        <th>#</th>
        <th>Miracle</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr class="shadow-lg mb-2" v-for="(miracle,index) in miracles" :key="miracle.post_id">
        <td class="text-center px-2 font-semibold py-2">{{ index + 1 }}.</td>
        <td class="text-xs py-2" v-html="miracle.motive"></td>
        <td class="px-1 text-center align-middle py-2 flex">
          <a href="#" class="bg-blue-500 rounded-full px-2 py-2 md:mr-2 mr-1"
             @click.prevent="copyUrl(location+'/?motive='+miracle.post_id)">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
            </svg>
          </a>
          <a href="#" class="bg-red-500 rounded-full px-2 py-2" @click.prevent="deleteMiracle(miracle.post_id)">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {miraclesCollection} from "@/firebase";

export default {
  name: "MyMiracles",
  data() {
    return {
      miracles: [],
      loading: false,
      location: window.location.origin
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  created() {
    this.getMiracles()
  },
  methods: {
    async deleteMiracle(post_id) {
      await miraclesCollection.doc(this.user.uid)
          .collection('posts')
          .doc(post_id)
          .delete()
      //remove this from  array
    },
    getMiracles() {
      this.loading = true
      miraclesCollection.doc(this.user.uid)
          .collection('posts')
          .get()
          .then(async (snap) => {
            console.log(snap.docs)
            this.miracles = await snap.docs.map(doc => {
              return doc.data()
            });
            this.loading = false
          })
          .catch(err => {
            this.loading = false
            console.log(err)
          })
    },
    copyUrl(content) {
      const el = document.createElement('textarea');
      el.value = content;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
  }
}
</script>

<style scoped>

</style>