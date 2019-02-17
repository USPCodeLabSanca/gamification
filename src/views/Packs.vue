<template>
  <div class="packs">
    <q-modal
      v-model="opened"
      transition="bounce"
      content-css="height: 70vh; width: 90vw;"
      minimized
      no-esc-dismiss
    >
      <div class="modal">
        <div class="modal__stickers">
          <q-carousel
            v-if="screenOrientation === 'vertical'"
            class="text-white"
            handle-arrow-keys
            arrows
          >
            <q-carousel-slide v-for="index in pack.length" :key="index">
              <div class="sticker-container">
                <app-sticker :row="pack[index-1][1]" :col="pack[index-1][2]" :puzzle="pack[index-1][0]" :show="true" />
              </div>
            </q-carousel-slide>
          </q-carousel>
          <div v-else class="sticker-container" v-for="index in pack.length" :key="index">
            <app-sticker :row="pack[index-1][1]" :col="pack[index-1][2]" :puzzle="pack[index-1][0]" :show="true" />
          </div>
        </div>
        <q-btn
          color="primary"
          @click="opened = false"
          label="OK"
        />
      </div>
    </q-modal>
    <p class="title">Meus Pacotes</p>
    <div class="packs__center">
      <p v-if="!zeroPacks">Clique para abrir!</p>
      <transition
        v-bind:css="false"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave"
      >
        <img v-if="!shake" :class="{noPack: zeroPacks}" @click="callAnimation()" src="@/assets/pack.png" />
      </transition>
    </div>
    <p class="subtitle">{{ packs }} Pacote{{ packs != 1 ? 's' : '' }} Restante{{ packs != 1 ? 's' : '' }}</p>
  </div>
</template>

<style scoped>
  .packs {
    height: calc(100vh - 50px);
    width: 100%;
    margin-top: 49px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    overflow: hidden;
  }
  .packs__center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .packs img {
    height: 50vh;
  }
  .noPack {
    opacity: 0.5;
  }
  p.title {
    font-size: 4vh;
  }
  p.subtitle {
    font-size: 3vh;
  }
  p {
    font-family: 'Adventuring';
    font-size: 2vh;
    color: var(--q-color-dark);
  }
  .modal {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
  .modal__stickers {
    height: 50vh;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }
  .modal .q-carousel-slide {
    padding: 0;
    display: flex;
    justify-content: center;
    overflow: hidden;
  }
  .sticker-container {
    height: 100%;
    width: calc(50vh * 0.7070707070707071);
    position: relative;
  }
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Sticker from '../components/Sticker';
  import Velocity from 'velocity-animate'
  export default {
    data () {
      return {
        opened: false,
        shake: false,
        shakeDuration: 100,
        screenOrientation: 'vertical',
        opening: false,
        pack: []
      }
    },
    computed: {
      ...mapGetters([
        'packs',
        'cards'
      ]),
      zeroPacks: function() {
        return (this.packs === 0) || (this.cards.total - this.cards.user < 1);
      }
    },
    components: {
      'app-sticker': Sticker
    },
    created() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      ...mapActions(['openPack']),
      handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.screenOrientation = ((height/2) * 0.7070707070707071 * 3) < (0.7 * width) ? 'horizontal' : 'vertical';
      },
      callAnimation: function() {
        if(!this.opening) {
          this.shake = (!this.zeroPacks);
          if (this.shake) {
            this.opening = true;
            this.openPack().then(result => {
              console.log('result');
              let r1 = JSON.parse(JSON.stringify(result));
              console.log(r1);
              this.pack = result.map(sticker => {
                let n = sticker[1];
                sticker[1] = Math.floor(n/4) + 1;
                sticker.push(n%4+1);
                return sticker;
              });
              console.log(' figs : ')
              console.log(this.pack);
              this.opening = false;
            });
          }
        }
      },
      beforeEnter: function (el) {
        el.style.rotateZ = 25;
      },
      enter: function (el, done) {
        var vm = this;
        Velocity(el,
          { rotateZ: 25 },
          {
            duration: vm.shakeDuration,
            complete: function () {
              Velocity(el,
                { rotateZ: 0 },
                {
                  duration: vm.shakeDuration,
                  complete: function () {
                    Velocity(el,
                      { rotateZ: 0 },
                      {
                        duration: (!vm.opening ? 5 : 0) * vm.shakeDuration,
                        complete: function () {
                          done();
                          if (!vm.shake && !vm.opening) vm.opened = true;
                          else vm.shake = true;
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      },
      leave: function (el, done) {
        var vm = this;
        Velocity(el,
          { rotateZ: -25 },
          {
            duration: vm.shakeDuration,
            complete: function () {
              Velocity(el,
                { rotateZ: 0 },
                {
                  duration: vm.shakeDuration,
                  complete: function () {
                    done();
                    vm.shake = false;
                  }
                }
              );
            }
          }
        );
      }
    }
  }
</script>
