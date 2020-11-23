<template>
  <div class="shadow-lg my-1 mx-24 px-2 py-10 text-gray-900  bg-white w-full">
    <div class="flex items-center mx-12">
      <img alt="Vue logo" class="h-10 h-10 p-1 rounded-full bg-gray-200 mr-2" src="../assets/logo.png">
      <h3 class="text-sm font-semibold">#1MinuteMiracle</h3>
    </div>
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

    <p v-if="editing" class="mx-64">After editing done press enter</p>
    <div class="my-2 mx-64 editor shadow px-10 py-5" ref="editor" @blur.prevent="editEnd"
         @keydown.enter.prevent="endEdit"
         v-html="motive">
    </div>

    <h1 class="text-lg font-bold text-gray-300 text-center">...</h1>

    <div class="flex justify-center">
      <button @click="toggle" class="rounded-lg py-1 px-2 bg-red-500 shadow text-white hover:bg-red-600 text-center">
        {{ editing ? "Download" : "Edit" }}
      </button>
    </div>

    <div class="flex-none mx-64 my-4 flex flex-col shadow-lg bg-gray-100 py-3 px-12">
      <div class="flex items-center justify-center">
        <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile pic" class="w-12 h-12 rounded-full"/>
        <h3 class="text-md font-medium text-gray-800 ml-3">@Shejadul Karim</h3>
      </div>
      <div class="flex-none my-3 text-center">
        <blockquote class="text-md text-justify font-semibold">{{ stripedhtml }}</blockquote>
      </div>
    </div>

  </div>
</template>

<script>
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
  methods: {
    editEnd() {
      this.toggle()
    },
    endEdit() {
      this.editing = !this.editing
      this.motive = this.$refs['editor'].innerHTML
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
          node.className = ''
        }
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
