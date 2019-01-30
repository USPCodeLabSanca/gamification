<template>
  <div class="stickers">
    <app-sticker-board />
  </div>
</template>

<style scoped>
  .stickers {
    height: calc(100vh - 50px);
    width: 100%;
    margin-top: 49px;
  }
</style>

<script>
  import StickerBoard from '../components/StickerBoard';
  export default {
    data: () => ({
      height: 10,
    }),
    components: {
      'app-sticker-board': StickerBoard
    }
  }
</script>