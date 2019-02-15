<template>
  <div class="sticker-board" :class="screenOrientation">
    <div class="sticker-board__center" :class="screenOrientation">
      <div v-for="row in 4" :key="row" class="row">
        <div class="sticker-container" v-for="col in 4" :key="col">
          <app-sticker :row="row" :col="col" :puzzle="puzzle" :show="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .sticker-board {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .sticker-board.horizontal {
    height: calc(88vh - 50px);
  }
  .sticker-board.vertical {
    height: calc(100vw * 1.414285714285714);
  }
  .row {
    height: 25%;
  }
  .sticker-board__center.horizontal {
    height: calc(88vh - 50px);
    width: calc((88vh - 50px) * 0.7070707070707071);
  }
  .sticker-board__center.vertical {
    height: calc(100vw * 1.414285714285714);
    width: 100vw;
  }
  .sticker-container {
    height: 100%;
    width: 25%;
    position: relative;
  }
</style>

<script>
  import Sticker from '../components/Sticker';
  export default {
    data: () => ({
      screenOrientation: 'vertical'
    }),
    props: [
      'puzzle'
    ],
    components: {
      'app-sticker': Sticker
    },
    created() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.screenOrientation = (0.88*height - 50) > (1.414285714285714 * width) ? 'vertical' : 'horizontal';
      }
    }
  };
</script>