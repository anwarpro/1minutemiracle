<template>

  <div class="w-full">

    <div class="">
      <p v-if="editing" class="md:mx-24 text-red-400 font-bold mx-2">After editing press enter or click on done</p>

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

    <div class="mt-4 w-full flex justify-center">
      <div v-if="loading" class="flex justify-center px-2 py-2">
        <h3 class="relative">
            <span
                class="w-10 h-10 rounded-full absolute border-4 inline-block text-yellow-500 font-bold text-xs flex justify-center items-center">
            </span>
          <span class="w-10 h-10 rounded-full absolute border-r-4 border-red-500 inline-block animate-spin"></span>
        </h3>
      </div>
      <img v-else :src="output" alt="Output" class="w-1/3">
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
      original: "You're super <b>awesome</b>",
      motive: "You're super <b>awesome</b>",
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
      let regex = /(<([^>]+)>)/ig;
      return this.motive.replaceAll(regex, "")
    },
    gFace() {
      return this.face !== '' ? this.face : '/img/pic.78e96f0b.png'
    }
  },
  watch: {
    fireUser() {
      this.getFace(this.fireUser && this.fireUser.face !== '' ? this.fireUser.face : '/img/pic.78e96f0b.png')
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

      const image = await Jimp.read(
          '/bg/back.png'
      );

      const profileImage = await Jimp.read(
          this.gFace
      );

      await profileImage.resize(100, 100)

      /*
            const size = 80;
            const rad = size / 2;
            const black = 0xFF000000; //[0, 0, 0, 255];
            const white = 0xFFFFFFFF; //[255, 255, 255, 255];

            const img = new ImageData(size, size);
            const data = new Uint32Array(img.data.buffer);

            for (let x = 0; x < size; x++) {
              for (let y = 0; y < size; y++) {
                const dist = this.distanceFromCenter(rad, x, y);
                let color;
                if (dist >= rad + 1) color = black;
                else if (dist <= rad) color = white;
                else {
                  const mult = (255 - Math.floor((dist - rad) * 255)).toString(16).padStart(2, 0);
                  color = '0xff' + mult.repeat(3); // grayscale 0xffnnnnnn
                }
                // image.setPixelColor(color, x, y);
                data[(y * size) + x] = Number(color);
              }
            }*/

      // eslint-disable-next-line no-unused-vars
      // let mask = new Jimp({data: img.data, width: 80, height: 80}, (err, image) => {
      //   // this image is 1280 x 768, pixels are loaded from the given buffer.
      // });

      // let mask = await Jimp.read('/bg/mask.png')
      // await mask.resize(100, 100)

      // mask the image
      await profileImage.circle()

      await image.print(font36, 53, 129, {
        text: this.stripedhtml,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
      }, 924, 222);

      await image.composite(profileImage, 350, 28)
      await image.print(
          font28, 466, 28,
          {
            text: this.fireUser && this.fireUser.name !== '' ? '@' + this.fireUser.name : '@Shajedul Karim',
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
