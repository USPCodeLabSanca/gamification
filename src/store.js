import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex)

let auth_uri = 'http://localhost:3000';

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
    login(state, data) {
      state.isUserLogged = true;
      state.token = data.token;
      state.points = data.user.points;
      state.packs = data.user.packs;
      state.stickers = data.user.cards;
      const reducer = (accumulator, currentValue) => accumulator + currentValue.filter(stickerCount => stickerCount > 0).length;
      state.userCards = data.user.cards.reduce(reducer, 0);
    },
    logout(state) {
      state.isUserLogged = false;
      state.token = '';
    },
    openPack(state, data) {
      state.stickers = data.cards;
      state.packs = data.packs;
      const reducer = (accumulator, currentValue) => accumulator + currentValue.filter(stickerCount => stickerCount > 0).length;
      state.userCards = state.stickers.reduce(reducer, 0);
    }
  },
  actions: {
    openPack: ({ commit, state }) => (
      new Promise((resolve, reject) => {
        Axios({
          method: 'POST',
          headers: {'Authorization': 'Bearer ' + state.token},
          url: auth_uri + '/api/users/open'
        }).then(response => {
          commit('openPack', response.data);
          resolve(response.data.indexes);
        })
      })
    )
  }
})
