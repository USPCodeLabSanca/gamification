<template>
  <div class="sticker">
    <p>{{stickerNumber}}</p>
    <img :src="getImg()"/>  
  </div>
</template>

<style scoped>
  .sticker {
    height: 100%;
    width: 25%;
    position: relative;
  }
  .sticker img {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .sticker > p {
    position: absolute;
    bottom: 5px;
    left: 5px;
    margin: 0;
  }
</style>

<script>
  import { mapGetters } from 'vuex';
  export default {
    props: [
      'puzzle',
      'row',
      'col'
    ],
    computed: {
      ...mapGetters([
        'stickers'
      ]),
      stickerNumber: function() {
        return this.puzzle * 16 + (this.row - 1)*4 + this.col;
      }
    },
    methods: {
      getImg: function() {
        if (this.stickers[this.puzzle][this.stickerNumber - this.puzzle * 16 - 1] === true) {
          return require("../assets/puzzles/" + this.puzzle + "/row-" + this.row + "-col-" + this.col + ".png");
        } else {
          return require("../assets/card-back.png");
        }
      }
    }
  };
</script>