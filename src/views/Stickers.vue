<template>
  <div class="stickers">
    <div class="stickers__title">
      <p>Minhas Figurinhas</p>
    </div>
    <q-carousel
      class="text-white"
      handle-arrow-keys
      arrows
      @input="changeIndex"
    >
      <q-carousel-slide v-for="index in puzzleNumber" :key="index">
        <app-sticker-board :puzzle="index - 1"/>
      </q-carousel-slide>
    </q-carousel>
    <div class="stickers__title">
      <p>{{stickerCountN}}/16</p>
    </div>
  </div>
</template>

<style scoped>
  .stickers {
    height: calc(100vh - 50px);
    width: 100%;
    margin-top: 49px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-content: center;
  }
  .q-carousel-slide {
    padding: 0;
  }
  .stickers__title {
    height: 6vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .stickers__title p {
    font-size: 4vh;
    font-family: 'Adventuring';
    margin: 0;
    color: var(--q-color-dark);
  }
  .scroll {
    overflow: hidden;
  }
</style>

<script>
  import { mapGetters } from 'vuex';
  import StickerBoard from '../components/StickerBoard';
  import Router from '../router';
  export default {
    data: () => ({
      carouselIndex: 0
    }),
    components: {
      'app-sticker-board': StickerBoard
    },
    computed: {
      ...mapGetters([
        'puzzleNumber',
        'stickers',
        'stickerCount',
        'isUserLogged'
      ]),
      stickerCountN: function() {
        return this.stickerCount[this.carouselIndex];
      }
    },
    mounted() {
      if (!this.isUserLogged) {
        Router.push({name: 'Home'});
      }
    },
    methods: {
      changeIndex: function(index) {
        this.carouselIndex = index;
      }
    }
  }
</script>