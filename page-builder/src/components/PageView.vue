<template>
  <div class="view-container">
    <div v-html="html"></div>
    <div class="view-overlay"  @click="toggleModal">
      <progress class="progress is-small is-primary" v-show="isLoading" max="100"></progress>
    </div>
    <div :class="modalClasses">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <component :is="name" :data="data" @onSubmit="onSubmit"/>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="toggleModal"></button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import RepoListing from './forms/RepoListing.vue'
import Navbar from './forms/Navbar.vue'

export default {
  components: {
    RepoListing,
    Navbar
  },
  props: ['data', 'html', 'name', 'uuid', 'is-loading'],
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    modalClasses () {
      const classes = ['modal']
      if (this.isOpen) {
        classes.push('is-active');
      }
      return classes.join(' ');
    }
  },
  methods: {
    toggleModal () {
      this.isOpen = !this.isOpen;
    },
    onSubmit (data) {
      this.toggleModal()
      this.updateComponentData({
        key: this.uuid,
        data
      });
    },
    ...mapActions(['updateComponentData'])
  }
}
</script>
<style scoped>
  .view-container {
    position: relative;
    margin-bottom: 24px; 
  }

  .view-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;  
    transition: all 0.3s;
    z-index: 30;
    cursor: pointer;
  }

  .view-overlay:hover {
    box-shadow: inset 0px 0px 0px 4px #00d1b2;
  }
</style>
