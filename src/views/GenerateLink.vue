<template>
  <div class="mx-12 my-8">
    <textarea class="w-full h-24 px-4 py-2 border border-gray-300" v-model="text"></textarea>
    <p class="my-2 flex">
      <input v-model="encoded" ref="link" type="text" readonly class="flex-1"/>
      <span class="bg-gray-500 text-white ml-2 cursor-pointer px-2 pt-2 pb-1 rounded uppercase"
            @click="copy">{{ status }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "GenerateLink",
  data() {
    return {
      text: '',
      status: 'Copy'
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
    }
  },
  computed: {
    encoded() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.status = 'Copy';
      return window.location.origin + "/#/?motive=" + encodeURI(this.text)
    }
  }
}
</script>

<style scoped>

</style>