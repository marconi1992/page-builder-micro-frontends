import { renderVuex } from 'hypernova-vue'
import RepoListing from './components/RepoListing.vue'

import createRepoListingStore from './store/repo-listing'

renderVuex('RepoListing', RepoListing, createRepoListingStore)
