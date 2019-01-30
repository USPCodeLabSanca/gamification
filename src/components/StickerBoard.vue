<template>
  <div class="sticker-board">
    <div class="side left" :class="screenOrientation" /> 
    <div class="sticker-board__center" :class="screenOrientation">
      <div class="sticker-board__center__top">
        <p>Minhas Figurinhas</p>
      </div>
      <div class="sticker-board__center__middle" :class="screenOrientation">
        whatever
      </div>
      <div class="sticker-board__center__bottom">
        <p>5/16</p>
      </div>
    </div>
    <div class="side right" :class="screenOrientation" />
  </div>
</template>

<style scoped>
  .sticker-board {
    background-color: salmon;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .side {
    height: 100%;
    background-color: rebeccapurple;
  }
  .side.horizontal {
    width: calc((100vw - ((100vh - 100px) / 1.4142))/2) 
  }
  .side.vertical {
    width: 10vw;
  }
  .sticker-board__center__middle.vertical {
    height: calc(80vw * 1.4142);
    width: 80vw;
    background-color: aqua;
  }
  .sticker-board__center__middle.horizontal {
    height: calc(100vh - 100px);
    width: calc((100vh - 100px) / 1.4142);
    background-color: aqua;
  }
  .sticker-board__center {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
  }
  .sticker-board__center.vertical {
    width: 80vw;
  }
  .sticker-board__center.horizontal {
    width: calc((100vh - 100px) / 1.4142);
  }
  .sticker-board__center__top .sticker-board__center__bottom {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .sticker-board__center p{
    font-size: 20pt;
    margin: 10px;
    text-align: center;
    white-space: nowrap;
  }
</style>

<script>
  export default {
    data: () => ({
      screenOrientation: 'vertical'
    }),
    created() {
      window.addEventListener('resize', this.handleResize)
      this.handleResize();
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.screenOrientation = height - 100 > (1.4142 * (width - 100)) ? 'vertical' : 'horizontal';
      }
    }
  };
</script>