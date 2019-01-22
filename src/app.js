import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Quasar, { QLayout, QBtn, QLayoutDrawer, QList, QListHeader, QItem, QItemMain, QItemSeparator, QItemSide, QItemTile } from "quasar-framework/dist/quasar.mat.esm";

Vue.use(Quasar, { components: [QLayout, QBtn, QLayoutDrawer, QList, QListHeader, QItem, QItemMain, QItemSeparator, QItemSide, QItemTile] });

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: function () {
    return {
      version: Quasar.version
    }
  }
})