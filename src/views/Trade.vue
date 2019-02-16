<template>
  <div class="trade-page">
    <q-modal
      v-model="openReader"
      transition="bounce"
      maximized
      no-esc-dismiss
    >
      <div class="modal--readQR">
        <qrcode-stream v-if="openReader" @decode="onDecode"></qrcode-stream>
        <q-btn
          color="primary"
          @click="openReader = false"
          label="FECHAR"
        />
      </div>
    </q-modal>
    <q-modal
      v-model="openQR"
      transition="bounce"
      maximized
      no-esc-dismiss
    >
      <div class="modal--readQR">
        <qr-code text="Text to encode"></qr-code>
        <q-btn
          color="primary"
          @click="openQR = false"
          label="FECHAR"
        />
      </div>
    </q-modal>
    <p class="title">Trocar Figurinhas</p>
    <q-btn
      color="primary"
      @click="openReader = true"
      label="Ler QR Code"
    />
    <div class="trade-page__quantity">
      <p>OU</p>
      <p class="subtitle">Selecione figurinhas</p>
    </div>
    <div class="trade-page__select">
      <div class="trade-page__quantity">
        <div class="trade-page__options">
          <p>Tenho:</p>
          <q-select
            v-model="have"
            :options="haveOptions"
          />
        </div>
        <p>Inventário: {{ stickers[haveCard[0]][haveCard[3]] }}</p>
        <div class="sticker-container--mini">
          <app-sticker :row="haveCard[1]" :col="haveCard[2]" :puzzle="haveCard[0]" :show="false" />
        </div>
      </div>
      <div class="trade-page__quantity">
        <div class="trade-page__options">
          <p>Quero:</p>
          <q-select
            v-model="want"
            :options="wantOptions"
          />
        </div>
        <p>Inventário: {{ stickers[wantCard[0]][wantCard[3]] }}</p>
        <div class="sticker-container--mini">
          <app-sticker :row="wantCard[1]" :col="wantCard[2]" :puzzle="wantCard[0]" :show="false" />
        </div>
      </div>
    </div>
    <q-btn
      color="primary"
      @click="openQR = true"
      label="Gerar QR Code"
    />
  </div>
</template>

<style scoped>
  .trade-page {
    margin-top: 49px;
    height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center
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
    color: var(--q-color-dark)
  }
  .trade-page__select {
    width: calc(25vh * 0.7070707070707071 * 3);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 5vh;
  }
  .trade-page__quantity {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .trade-page__options {
    width: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
  }
  .sticker-container--mini {
    height: 25vh;
    width: calc(25vh * 0.7070707070707071);
    position: relative;
  }
  .modal--readQR {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
</style>

<script>
  import { QrcodeStream } from 'vue-qrcode-reader';
  import { mapGetters } from 'vuex';
  import VueQRCodeComponent from 'vue-qrcode-component'
  import Sticker from '../components/Sticker';

  export default {
    data () {
      return {
        openReader: false,
        openQR: false,
        have: 1,
        want: 1
      }
    },
    computed: {
      ...mapGetters([
        'cards',
        'stickers'
      ]),
      haveOptions: function() {
        let total = this.cards.total;
        let haveOptions = [];
        for(let i = 0, k = 1; i < 3; ++i) {
          for (let j = 0; j < 16; ++j, ++k) {
            if (this.stickers[i][j]) {
              haveOptions.push({label: k.toString(), value: k});
            }
          }
        }
        return haveOptions;
      },
      wantOptions: function() {
        let total = this.cards.total;
        let wantOptions = [];
        for (let i = 1; i <= total; ++i) {
          wantOptions.push({label: i.toString(), value: i});
        }
        return wantOptions;
      },
      wantCard: function() {
        let card = [];
        card.push(Math.floor((this.want-1)/16));
        let n = (this.want-1)%16;
        card.push(Math.floor(n/4) + 1);
        card.push(n%4+1);
        card.push(n);
        return card;
      },
      haveCard: function() {
        let card = [];
        card.push(Math.floor((this.have-1)/16));
        let n = (this.have-1)%16;
        card.push(Math.floor(n/4) + 1);
        card.push(n%4+1);
        card.push(n);
        return card;
      }
    },
    components: {
      QrcodeStream,
      'app-sticker': Sticker,
      'qr-code': VueQRCodeComponent
    },
    methods: {
      onDecode(decodedString) {
        console.log(decodedString);
        //TODO call action/backend
      }
    },

  }
</script>
