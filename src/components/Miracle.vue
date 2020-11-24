<template>
  <div class="mx-12 mt-4">
    <p>
      Sometimes short is all we need or can have.
      A short image or small sentence can stop suicide
      <br>
      We all are smart and creative, we just need that one spark and creativity
      <br><br>
      Sometimes we don’t need to know how to do something. We just need to know what to do and why to do it.
    </p>
  </div>
  <h1 class="text-lg font-bold text-gray-300 text-center">...</h1>

  <p v-if="editing" class="mx-64 text-red-500">After editing done press enter</p>
  <div class="my-2 mx-64 editor shadow px-10 py-5" ref="editor" @blur.prevent="editEnd"
       @keydown.enter.prevent="endEdit"
       v-html="motive">
  </div>

  <h1 class="text-lg font-bold text-gray-300 text-center">...</h1>

  <div class="flex justify-center">
    <button @click="toggle" class="rounded-lg py-1 px-2 bg-red-500 shadow text-white hover:bg-red-600 text-center">
      {{ editing ? "Done" : "Edit" }}
    </button>
    <button @click="drawText"
            class="ml-2 rounded-lg py-1 px-2 bg-green-500 shadow text-white hover:bg-green-600 text-center">Download
    </button>
  </div>

  <div class="flex justify-center my-2">
    <div ref="output" class="flex-none flex flex-col shadow-lg bg-gray-100 py-3 px-12 w-100">
      <div class="flex items-center justify-center">
        <img src="../assets/img/pic.jpg" alt="Profile pic" class="w-12 h-12 rounded-full"/>
        <h3 class="text-md font-medium text-gray-800 ml-3">@Shejadul Karim</h3>
      </div>
      <div class="flex-none my-3 text-center">
        <blockquote class="text-md text-justify font-semibold">{{ stripedhtml }}</blockquote>
      </div>
    </div>
  </div>

</template>

<script>

// import canvasTxt from 'canvas-txt'

import * as htmlToImage from 'html-to-image';

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
    stripedhtml() {
      let regex = /(<([^>]+)>)/ig;
      return this.motive.replaceAll(regex, "")
    }
  },
  mounted() {
    if (this.$route.query.motive && !this.$route.query.motive.toString.length) {
      this.original = this.$route.query.motive
      this.motive = this.$route.query.motive
    }
  },
  methods: {
    editEnd() {
      this.toggle()
    },
    endEdit() {
      this.toggle()
      this.motive = this.$refs['editor'].innerHTML
    },

    drawText() {
      var _this = this
      htmlToImage.toPng(this.$refs['output'])
          .then(function (dataUrl) {
            _this.download(dataUrl)
          })
          .catch(function (error) {
            console.error('oops, something went wrong!', error);
          });
    },

    download(data) {
      var filename = "motivational.png"
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
      this.$refs["editor"].querySelectorAll("b").forEach(node => {
        node.contentEditable = this.editing
        if (this.editing) {
          node.classList.add("bg-gray-300")
          node.classList.add("text-gray-800")
          node.classList.add("px-2")
          node.classList.add("py-1")
          node.classList.add("rounded")
        } else {
          node.className = ' '
        }
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
