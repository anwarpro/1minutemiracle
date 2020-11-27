<template>
  <div class="md:mx-12 md:my-8 mx-2 my-6 w-full px-2 py-2">
    <textarea class="w-full h-24 px-4 py-2 border border-gray-300 bg-transparent text-white rounded-xl"
              v-model="text"></textarea>

    <div class="md:my-2 md:mx-24 my-4 mx-2 text-xl editor shadow md:px-12 md:py-6 px-3 py-4 text-white "
         v-html="text">
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

export default {
  name: "GenerateLink",
  data() {
    return {
      text: '',
      status: 'Copy',
      miracle: '',
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
      if (this.text.trim() !== '') {
        const docRef = miraclesCollection.doc(this.user.uid).collection('posts')
        if (this.miracle) {
          docRef.doc(this.miracle.id)
              .set({motive: this.text, post_id: this.miracle.id}, {merge: true})
        } else {
          docRef.add({
            motive: this.text.trim()
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