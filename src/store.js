import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isUserLogged: false,
    userCards: 18,
    totalCards: 25,
    points: 70
  },
  getters: {
    isUserLogged: ({ isUserLogged }) => isUserLogged,
    cards: state => ({
        user: state.userCards,
        total: state.totalCards
      }),
    points: ({ points }) => points
  },
  mutations: {

  },
  actions: {

  }
})
