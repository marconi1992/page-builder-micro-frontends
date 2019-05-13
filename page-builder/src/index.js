import hypernova from 'hypernova/server'
import { renderVuex } from 'hypernova-vue'
import express from 'express'
import path from 'path'

import PageBuilder from './components/PageBuilder.vue'

import createPageBuilderStore from './store/page-builder'

hypernova({
  devMode: process.env.NODE_ENV !== 'production',
  getComponent (name) {
    if (name === 'PageBuilder') {
      return renderVuex(name, PageBuilder, createPageBuilderStore)
    }
  },
  port: process.env.PORT || 3000,

  createApplication () {
    const app = express()

    app.use('/page-builder', express.static(path.join(process.cwd(), 'dist')))

    return app
  }
})
