import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isUserLogged: false,
    userCards: 18,
    totalCards: 25,
    points: 70,
    puzzleNumber: 3,
    stickers: [
      [true, true, false, true, true, true, true, false, false, true, true, false, true, true, true, false],
      [true, true, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
      [true, false, false, false, false, false, true, false, false, false, true, true, true, false, true, false]
    ]
  },
  getters: {
    isUserLogged: ({ isUserLogged }) => isUserLogged,
    cards: state => ({
        user: state.userCards,
        total: state.totalCards
      }),
    points: ({ points }) => points,
    puzzleNumber: ({ puzzleNumber }) => puzzleNumber,
    stickers: ({ stickers }) => stickers,
    stickerCount: ({ stickers }) => {
      let count = [];
      for (let i = 0; i < stickers.length; ++i) {
        count.push(stickers[i].filter(sticker => sticker === true).length);
      }
      return count;
    }
  },
  mutations: {

  },
  actions: {

  }
})
