import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isUserLogged: false,
    token: '',
    userCards: 18,
    totalCards: 48,
    points: 70,
    puzzleNumber: 3,
    stickers: [
      [1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0],
      [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0]
    ],
    packs: 99
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
        count.push(stickers[i].filter(sticker => sticker > 0).length);
      }
      return count;
    },
    packs: ({ packs }) => packs
  },
  mutations: {
    login(state, token) {
      state.isUserLogged = true;
      state.token = token;
    },
    logout(state) {
      state.isUserLogged = false;
      state.token = '';
    }
  },
  actions: {

  }
})
