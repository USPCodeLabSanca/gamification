<template>
  <div class="sticker">
    <p>{{stickerNumber}}</p>
    <img :src="getImg()" :class="{showBorder: showB}"/>  
  </div>
</template>

<style scoped>
  .sticker {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .sticker img {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .showBorder {
    border: 1px solid white;
  }
  .sticker > p {
    position: absolute;
    bottom: 5px;
    left: 5px;
    margin: 0;
    font-family: 'Adventuring';
    font-size: 12pt;
    color: white;
    text-shadow:
        2px 2px 0 #000,
      -1px -1px 0 #000,  
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000;
  }
</style>

<script>
  import { mapGetters } from 'vuex';
  export default {
    props: [
      'puzzle',
      'row',
      'col',
      'show'
    ],
    computed: {
      ...mapGetters([
        'stickers'
      ]),
      stickerNumber: function() {
        return this.puzzle * 16 + (this.row - 1)*4 + this.col;
      },
      showB: function() {
        return !(this.show === true || this.stickers[this.puzzle][this.stickerNumber - this.puzzle * 16 - 1] > 0);
      }
    },
    methods: {
      getImg: function() {
        if (this.show === true || this.stickers[this.puzzle][this.stickerNumber - this.puzzle * 16 - 1] > 0) {
          return require("../assets/puzzles/" + this.puzzle + "/row-" + this.row + "-col-" + this.col + ".jpg");
        } else {
          return require("../assets/back" + this.puzzle + ".png");
        }
      }
    }
  };
</script>