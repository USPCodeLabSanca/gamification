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
            <q-carousel-slide v-for="index in 3" :key="index">
              <div class="sticker-container">
                <app-sticker :row="1" :col="index" :puzzle="0" :show="true" />
              </div>
            </q-carousel-slide>
          </q-carousel>
          <div v-else class="sticker-container" v-for="index in 3" :key="index">
            <app-sticker :row="1" :col="index" :puzzle="0" :show="true" />
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
        <img v-if="!shake" :class="{noPack: zeroPacks}" @click="shake = (!zeroPacks)" src="@/assets/pack.png" />
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
  import { mapGetters } from 'vuex';
  import Sticker from '../components/Sticker';
  import Velocity from 'velocity-animate'
  export default {
    data () {
      return {
        opened: false,
        shake: false,
        shakeDuration: 75,
        screenOrientation: 'vertical'
      }
    },
    computed: {
      ...mapGetters([
        'packs'
      ]),
      zeroPacks: function() {
        return this.packs === 0;
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
      handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.screenOrientation = ((height/2) * 0.7070707070707071 * 3) < (0.7 * width) ? 'horizontal' : 'vertical';
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
                        duration: 5 * vm.shakeDuration,
                        complete: function () {
                          done();
                          if (!vm.shake) vm.opened = true;
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
