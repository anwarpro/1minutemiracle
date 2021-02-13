<template>

  <div class="w-full">

    <div class="">
      <p v-if="editing" class="md:mx-24 text-yellow-500 font-bold mx-2">After editing done, press Enter or click on
        Done</p>

      <div
          class="md:my-2 md:mx-24 my-4 mx-2 text-xl editor shadow-lg md:px-12 md:py-6 px-3 py-4 text-white leading-loose"
          ref="editor"
          @blur.prevent="editEnd"
          @keydown.enter.prevent="endEdit"
          v-html="motive">
      </div>

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

        <button v-if="!loading" @click="download"
                class="ml-2 rounded-full py-1 px-4 bg-green-500 shadow text-white hover:bg-green-600 text-center">
          Download
        </button>
      </div>
    </div>

    <div v-if="loading" class="mt-4 w-full flex justify-center">
      <div class="flex justify-center px-2 py-2">
        <h3 class="relative">
            <span
                class="w-10 h-10 rounded-full absolute border-4 inline-block text-yellow-500 font-bold text-xs flex justify-center items-center">
            </span>
          <span class="w-10 h-10 rounded-full absolute border-r-4 border-red-500 inline-block animate-spin"></span>
        </h3>
      </div>
      <!--      <img v-else :src="output" alt="Output" class="md:w-1/2 w-full">-->
    </div>

    <div v-else class="flex justify-center mx-4 px-0">
      <div class="w-full md:mx-16 mx-1 flex flex-col shadow-lg bg-gray-100 py-5 px-12 mt-6 rounded-lg text-gray-500">
        <div class="flex items-center justify-center">
          <img :src="gFace" alt="Profile pic" class="w-12 h-12 rounded-full border border-gray-300"/>
          <h3 class="text-md font-medium ml-3">
            @{{ fireUser && fireUser.name !== '' ? fireUser.name : 'Elon Musk' }}</h3>
        </div>
        <div class="flex-none my-3 text-center">
          <blockquote class="text-md text-justify font-semibold" v-html="motive"></blockquote>
        </div>
      </div>
    </div>

  </div>

</template>

<script>

import {mapGetters} from "vuex";
import {postCollection} from "@/firebase";
import {changeDpiDataUrl} from "changedpi"
import Jimp from 'jimp';

export default {
  name: 'Miracle',
  data() {
    return {
      editing: false,
      original: "You're super <strong>awesome</strong>.",
      motive: "You're super <strong>awesome</strong>.",
      face: '',
      output: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'user',
      fireUser: 'fireUser'
    }),
    stripedhtml() {
      let keepBr = this.motive.replaceAll("&nbsp;", "")
      keepBr = keepBr.replaceAll("<p><br></p>", "\n")
      keepBr = keepBr.replaceAll("</p>", "\n")
      let regex = /(<([^>]+)>)/ig;
      let cleanText = keepBr.replaceAll(regex, "")
      console.log("cleanText", cleanText)
      return cleanText
    },
    gFace() {
      return this.face !== '' ? this.face : '/bg/pic.jpg'
    }
  },
  watch: {
    fireUser() {
      this.getFace(this.fireUser && this.fireUser.face !== '' ? this.fireUser.face : '/img/pic.jpg')
    },
    motive() {
      this.jimpTest()
    }
  },
  created() {
    if (this.$route.query.motive && !this.$route.query.motive.toString.length) {
      this.getMotive(this.$route.query.motive);
    }
  },
  methods: {
    distanceFromCenter(rad, x, y) {
      return Math.hypot(rad - x, rad - y);
    },
    async jimpTest() {
      this.loading = true
      const font36 = await Jimp.loadFont(
          '/fnt/poppins_bold_36_gray.ttf.fnt'
      );
      const font28 = await Jimp.loadFont(
          '/fnt/poppins_bold_28_black.ttf.fnt'
      );

      let text = this.stripedhtml

      let totalTextHeight = 0;

      let lines = text.split("\n")
      for (const line of lines) {
        if (line === "") {
          totalTextHeight = totalTextHeight + 20
        } else {
          totalTextHeight = totalTextHeight + await Jimp.measureTextHeight(font36, line, 924);
        }
      }

      console.log(totalTextHeight)

      const image = await new Jimp(1024, totalTextHeight + 200, 0x0, function (err, image) {
        // do stuff with image
        if (err) throw err
        return image
      });

      const backgroundImage = await Jimp.read(
          '/bg/back.png'
      );

      console.log("back_loaded")

      await backgroundImage.resize(1024, totalTextHeight + 200 - 2)

      await image.composite(backgroundImage, 0, 1)

      const profileImage = await Jimp.read(
          this.gFace
      );
      console.log("face_loaded")

      await profileImage.resize(100, 100)

      // mask the image
      await profileImage.circle()

      console.log("profile circle")

      let nextLine = 129
      for (const line of lines) {

        if (line === "") {
          nextLine = nextLine + 20
          continue;
        }

        await image.print(font36, 53, nextLine, {
          text: line,
          alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
          alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
        }, 924, (err, image, {x, y}) => {
          console.log(x)
          nextLine = y
        });
        console.log("nextLine", nextLine)
      }

      await image.composite(profileImage, 350, 28)
      await image.print(
          font28, 466, 28,
          {
            text: this.fireUser && this.fireUser.name !== '' ? '@' + this.fireUser.name : '@Elon Musk',
            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
            alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT
          },
          500, 100)
      // await image.print(font, (image.bitmap.width / 2) + 15, 82, "Author")

      const b64 = await image.getBase64Async(Jimp.AUTO)
      this.output = changeDpiDataUrl(b64, 300)
      this.loading = false
    },

    async getMotive(id) {
      let mot = await postCollection.where('post_id', '==', id).get();
      // let mot = await miraclesCollection.doc(this.user.uid).collection('posts').doc(id).get()
      let miracle = mot.docs.pop()
      console.log(miracle.data())
      if (miracle && miracle.data().motive) {
        this.motive = miracle.data().motive
      }
    },
    editEnd() {
      this.motive = this.$refs['editor'].innerHTML
    },
    endEdit() {
      this.toggle()
      this.motive = this.$refs['editor'].innerHTML
    },
    download() {
      var filename = this.fireUser.name + '_' + Math.floor(Math.random() * 100) + '.png';
      /// create an "off-screen" anchor tag
      var lnk = document.createElement('a'), e;

      /// the key here is to set the download attribute of the a tag
      lnk.download = filename;

      /// convert canvas content to data-uri for link. When download
      /// attribute is set the content pointed to by link will be
      /// pushed as "download" in HTML5 capable browsers
      lnk.href = this.output;

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
    getFace(faceUrl) {
      const toDataURL = url => fetch(url)
          .then(response => response.blob())
          .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
          }))


      toDataURL(faceUrl)
          .then(dataUrl => {
            this.face = dataUrl
            this.jimpTest()
          })
    },
    toggle() {
      this.editing = !this.editing

      var this_ = this;
      this.$refs["editor"].querySelectorAll("strong").forEach(node => {
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
