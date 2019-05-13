<template>
  <div>
    <div :class="pageloaderClasses"><span class="title">Loading Page</span></div>
    <page-view 
      v-for="(view, key) in views"
      :key="key"
      :uuid="key"
      :name="view.name" 
      :data="view.data"
      :html="view.html"
      :is-loading="view.isRendering"
    />
    <a class="button is-primary" id="save-page" @click="updatePage">Save Page</a>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PageView from './PageView.vue'

export default {
  components: {
    PageView
  },
  props: ['components', 'objectID'],
  mounted () {
    return this.renderViews()
  },
  computed: {
    pageloaderClasses () {
      const classes = ['pageloader']

      if (this.isLoadingPage) {
        classes.push('is-active')
      }

      return classes.join(' ')
    },
    ...mapGetters([
      'views',
      'isLoadingPage',
      'onRendering'
    ])
  },
  methods: {
    ...mapActions([
      'renderViews',
      'updatePage'
    ])
  }
}
</script>

<style>
  #save-page {
    position: fixed;
    bottom: 16px;
    right: 16px;
    z-index: 33; 
  }
</style>
