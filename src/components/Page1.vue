<template>
  <div>
    <h1>Page 1</h1>
    <div class='figurinhas'>
      <div class='pic' />
      <div v-for="i in height">
        <div v-for="j in width">
          <div v-if="show[i-1][j-1]" class='show' v-on:click="changeStatus(i-1, j-1)"></div>
          <div v-else class='hide' v-on:click="changeStatus(i-1, j-1)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: green
}
.figurinhas {
  display: flex;
  position: relative;
}
.figurinhas div {
  height:100px;
  width:100px;
}
.figurinhas .pic {
  background-image: url("https://jooinn.com/images/picture-5.jpg");
  width: 1000px;
  height: 1000px;
  position: absolute;
  overflow: show;
  z-index: -10;
}
.figurinhas div .show {
    background-color: blue;
    opacity: 100%;
    border: 1px solid red;
}
.figurinhas div .hide {
    opacity: 0%;
}
</style>

<script>
export default {
  data: () => ({
    height: 10,
    width: 10,
    show: [[true, true, false, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, false, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true]],
  }),
  methods: {
    changeStatus: function(i,j) {
      this.show[i][j] = !this.show[i][j];
      this.show = [...this.show];
    }
  }
}
</script>