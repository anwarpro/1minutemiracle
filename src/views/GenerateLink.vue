<template>
  <div class="md:mx-12 md:my-8 mx-2 my-6 w-full px-2 py-2">

    <vue-editor v-model="content" class="border border-gray-300 bg-transparent text-white rounded-xl"></vue-editor>

    <div class="md:my-2 md:mx-24 my-4 mx-2 text-xl editor shadow md:px-12 md:py-6 px-3 py-4 text-white "
         v-html="content">
    </div>

    <div>
      <button class="md:my-2 md:mx-24 my-4 mx-2 px-2 py-1 bg-green-500 rounded-full text-white" @click.prevent="save">
        {{ miracle.id ? 'Update' : 'Save' }}
      </button>
    </div>

    <p class="my-2 flex md:flex-row flex-col" v-if="miracle.id">
      <input v-model="encoded" ref="link" type="text" readonly class="flex-1 rounded-lg px-4 bg-gray-300"/>

      <span class="self-end mt-1 bg-gray-500 text-white w-16 md:ml-2 cursor-pointer px-2 pt-1 pb-1 rounded-lg uppercase"
            @click="copy">{{ status }}</span>
    </p>
  </div>
</template>

<script>
import {miraclesCollection} from "@/firebase";
import {mapGetters} from "vuex";
import {VueEditor} from "vue3-editor";

export default {
  name: "GenerateLink",
  components: {
    VueEditor
  },
  data() {
    return {
      status: 'Copy',
      miracle: '',
      content: '<p>You are <strong>awesome</strong>.</p>',
    }
  },
  methods: {
    copy() {
      /* Select the text field */
      let copyText = this.$refs['link'];
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/

      /* Copy the text inside the text field */
      document.execCommand("copy");
      this.status = 'Copied'
    },
    save() {
      if (this.content.trim() !== '') {
        const docRef = miraclesCollection.doc(this.user.uid).collection('posts')
        if (this.miracle) {
          docRef.doc(this.miracle.id)
              .set({motive: this.content, post_id: this.miracle.id}, {merge: true})
        } else {
          docRef.add({
            motive: this.content.trim()
          }).then(data => {
            this.miracle = data
            //update post id
            docRef.doc(this.miracle.id).update({post_id: this.miracle.id})
          }).catch(err => {
            console.log(err)
          })
        }

      } else {
        this.error = 'Input field is empty'
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    }),
    encoded() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.status = 'Copy';
      return window.location.origin + "?motive=" + this.miracle.id
    }
  }
}
</script>

<style scoped>

</style>