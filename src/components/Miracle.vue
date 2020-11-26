<template>

  <div class="w-full">

    <div class="">
      <!--      <h3 v-if="user" class="mr-1 text-lg text-white mx-2 md:mx-24">Hi, {{ user.displayName ? user.displayName.split(' ')[0] : 'Guest' }}</h3>-->

      <!--    <h1 class="text-lg font-bold text-gray-300 text-center">...</h1>-->

      <p v-if="editing" class="md:mx-24 text-red-400 font-bold mx-2">After editing done press enter</p>

      <div
          class="md:my-2 md:mx-24 my-4 mx-2 text-xl editor shadow-lg md:px-12 md:py-6 px-3 py-4 text-white leading-loose"
          ref="editor"
          @blur.prevent="editEnd"
          @keydown.enter.prevent="endEdit"
          v-html="motive">
      </div>

      <!--    <h1 class="text-lg font-bold text-gray-300 text-center">...</h1>-->

      <div class="flex justify-center mt-3">
        <button @click="toggle"
                class=" flex rounded-full py-1 px-5 justify-between items-center bg-red-500 shadow text-white hover:bg-red-600 text-center">
        <span v-if="!editing" class="flex-none">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path
              stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
        </span>
          <span v-else class="flex-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path
              stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        </span>
          <span class="text-lg font-semibold ml-2">{{ editing ? "Done" : "Edit" }}</span>
        </button>

        <button @click="drawText"
                class="ml-2 rounded-full py-1 px-4 bg-green-500 shadow text-white hover:bg-green-600 text-center">
          Download
        </button>
      </div>
    </div>

    <div class="mt-4 w-full overflow-x-auto md:flex md:justify-center">

      <div ref="output" class="flex flex-col shadow-lg bg-gray-100 py-3 px-12 w-100">
        <div class="flex items-center justify-center">
          <img src="../assets/img/pic.jpg" alt="Profile pic" class="w-12 h-12 rounded-full"/>
          <h3 class="text-md font-medium text-gray-800 ml-3" v-if="fireUser">@{{
              fireUser.name ?? 'Shejadul Karim'
            }}</h3>
          <h3 class="text-md font-medium text-gray-800 ml-3" v-else>@Shejadul Karim</h3>
        </div>
        <div class="flex-none my-3 text-center">
          <blockquote class="text-md text-justify font-semibold">{{ stripedhtml }}</blockquote>
        </div>
      </div>

    </div>

  </div>

</template>

<script>

// import canvasTxt from 'canvas-txt'

import * as htmlToImage from 'html-to-image';
import {mapGetters} from "vuex";
import {miraclesCollection} from "@/firebase";

export default {
  name: 'Miracle',
  data() {
    return {
      editing: false,
      original: "Confidence is <b>kicking</b> your <b>special one</b> without <b>any fear of losing her</b>.",
      motive: "Confidence is <b>kicking</b> your <b>special one</b> without <b>any fear of losing her</b>."
    }
  },
  computed: {
    ...mapGetters({
      user: 'user',
      fireUser: 'fireUser'
    }),
    stripedhtml() {
      let regex = /(<([^>]+)>)/ig;
      return this.motive.replaceAll(regex, "")
    }
  },
  created() {
    if (this.$route.query.motive && !this.$route.query.motive.toString.length) {
      this.getMotive(this.$route.query.motive);
    }
  },
  methods: {
    async getMotive(id) {
      let mot = await miraclesCollection.doc(this.user.uid).collection('posts').doc(id).get()
      if (mot.data().motive) {
        this.motive = mot.data().motive
      }
    },
    editEnd() {
      this.motive = this.$refs['editor'].innerHTML
    },
    endEdit() {
      this.toggle()
      this.motive = this.$refs['editor'].innerHTML
    },
    drawText() {
      var _this = this
      htmlToImage.toPng(this.$refs['output'], {
        pixelRatio: 1
      }).then(function (dataUrl) {
        _this.download(dataUrl)
      })
          .catch(function (error) {
            console.error('oops, something went wrong!', error);
          });
    },

    download(data) {
      var filename = this.fireUser.name + '_' + Math.floor(Math.random() * 100) + '.png';
      /// create an "off-screen" anchor tag
      var lnk = document.createElement('a'), e;

      /// the key here is to set the download attribute of the a tag
      lnk.download = filename;

      /// convert canvas content to data-uri for link. When download
      /// attribute is set the content pointed to by link will be
      /// pushed as "download" in HTML5 capable browsers
      lnk.href = data;

      /// create a "fake" click-event to trigger the download
      if (document.createEvent) {
        e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window,
            0, 0, 0, 0, 0, false, false, false,
            false, 0, null);

        lnk.dispatchEvent(e);
      } else if (lnk.fireEvent) {
        lnk.fireEvent("onclick");
      }
    },
    toggle() {
      this.editing = !this.editing
      var this_ = this;
      this.$refs["editor"].querySelectorAll("b").forEach(node => {
        node.contentEditable = this.editing
        if (this.editing) {
          node.classList.add("bg-transparent")
          node.classList.add("text-white")
          node.classList.add("px-2")
          node.classList.add("py-1")
          node.classList.add("rounded")
          node.classList.add("border-b")
          node.classList.add("border-gray-300")
        } else {
          node.className = ' '
          this_.editEnd()
        }
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
