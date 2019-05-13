import { renderVuex } from 'hypernova-vue'
import PageBuilder from './components/PageBuilder.vue'

import createPageBuilderStore from './store/page-builder'

renderVuex('PageBuilder', PageBuilder, createPageBuilderStore)
