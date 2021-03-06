import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import './styles/quasar.styl'
import 'quasar-extras/animate'
import 'quasar-extras/roboto-font'
import 'quasar-extras/material-icons'
import {
  Quasar, 
  QBtn,
  QLayout,
  QLayoutHeader,
  QLayoutDrawer,
  QPage,
  QPageContainer,
  QTabs,
  QTab,
  QTabPane,
  QRouteTab,
  QToolbar,
  QToolbarTitle,
  QList,
  QListHeader,
  QInput,
  QItemSeparator,
  QItem,
  QItemSide,
  QItemMain,
  QProgress,
  QCarousel,
  QCarouselSlide,
  QCarouselControl,
  QCollapsible,
  QModal,
  QSelect,
  Notify
} from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    QBtn,
    QLayout,
    QLayoutHeader,
    QLayoutDrawer,
    QPage,
    QPageContainer,
    QTabs,
    QTab,
    QTabPane,
    QRouteTab,
    QToolbar,
    QToolbarTitle,
    QList,
    QListHeader,
    QInput,
    QItemSeparator,
    QItem,
    QItemSide,
    QItemMain,
    QProgress,
    QCarousel,
    QCarouselSlide,
    QCarouselControl,
    QCollapsible,
    QModal,
    QSelect
  },
  directives: {
  },
  plugins: {
    Notify
  }
})

Vue.config.productionTip = true
window.axios = require('axios');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
