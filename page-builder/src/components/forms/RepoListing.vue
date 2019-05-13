<template>
  <div>
    <div class="field">
      <label class="label">Term</label>
      <div class="control">
        <input class="input" type="text" v-model="data.term" placeholder="Term">
      </div>
    </div>
    <div class="field">
      <label class="label">Items Size</label>
      <div class="control">
        <input class="input" type="number" v-model="data.size" placeholder="Items Size">
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="submit">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    submit () {
      this.$emit('onSubmit', this.data);
    }
  }
}
</script>
