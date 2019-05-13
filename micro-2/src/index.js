import dotenv from 'dotenv'

import hypernova from 'hypernova/server'
import { renderVuex } from 'hypernova-vue'
import express from 'express'
import path from 'path'

import RepoListing from './components/RepoListing.vue'

import createRepoListingStore from './store/repo-listing'

import * as RepoService from './services/repos'

dotenv.config()

hypernova({
  devMode: process.env.NODE_ENV !== 'production',

  getComponent (name) {
    if (name === 'RepoListing') {
      return renderVuex(name, RepoListing, createRepoListingStore)
    }
  },
  port: process.env.PORT || 3000,

  createApplication () {
    const app = express()

    app.use('/micro-2', express.static(path.join(process.cwd(), 'dist')))

    app.get('/api/repos', async (req, res) => {
      const { q = 'Vue.js', per_page: size, page } = req.query || {}

      try {
        const repos = await RepoService.search(q, page, size)
        return res.json(repos)
      } catch (error) {
        console.error(error.message)
        return res.status(500).end()
      }
    })

    return app
  }
})
