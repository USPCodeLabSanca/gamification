<template>
  <div class="challenge-page" style="margin-top: 50px">
    <q-modal
      v-model="openReader"
      maximized
      no-esc-dismiss
    >
      <q-tabs underline-color="dark">
        <q-tab slot="title" default name="tab-qr">Qr Code</q-tab>
        <q-tab slot="title" name="tab-senha">Senha</q-tab>
        <q-tab-pane class="tab-qr" name="tab-qr">
          <div class="modal--readQR">
            <qrcode-stream v-if="openReader" @decode="onDecode" :paused="pauseQR"></qrcode-stream>
            <p v-if="!qrFound" class="qr_modal_sentence">Procurando código...</p>
            <q-btn
              color="primary"
              @click="closeModal"
              label="FECHAR"
            />
          </div>
        </q-tab-pane>
        <q-tab-pane class="tab-senha" name="tab-senha">
          <p>Código secreto:</p>
          <q-input v-model="inserted" type="text"/>
          <q-btn
              color="primary"
              @click="onDecode(inserted)"
              label="VALIDAR CÓDIGO"
          />
          <q-btn
              color="primary"
              @click="closeModal"
              label="FECHAR"
          />
        </q-tab-pane>
      </q-tabs>
    </q-modal>
    <q-tabs underline-color="dark">
      <q-tab default slot="title" name="tab-1" >Disponíveis</q-tab>
      <q-tab slot="title" name="tab-2">Finalizadas</q-tab>
      <q-tab-pane name="tab-1">
        <div class="challenge_screen">
          <div v-for="missionType in missionTypes" v-bind:key="missionType.title" class="challenge">
            <div class="challenge_header">
              <i class="material-icons">{{missionType.icon}}</i>
              <span> {{missionType.title}} </span>
            </div>
            <div v-for="quest in activeQuests" v-if="quest.questType === missionType.type" v-bind:key="quest.questId" class="challenge_topic"> 
              <q-collapsible :label="quest.name" style="width: 100%;">
                <div>
                  <p>{{quest.description}}</p>
                  <div class="card_footer">
                    <div class="finished">
                      <p>Termina em: </p>
                      <p style="color: red">{{formatDate(quest.endDate)}}</p>
                    </div>
                    <q-btn v-if="!getQuestFinishedLabel(quest, questsCompleted)" color="primary" label="QrCode / Senha" @click="openModal(quest)"/>
                    <span class="success_label" v-else>Concluída</span>
                  </div>
                </div>
              </q-collapsible>
            </div>
          </div>
        </div>
      </q-tab-pane>
      <q-tab-pane name="tab-2">
        <div class="challenge_screen">
          <div v-for="missionType in missionTypes" v-bind:key="missionType.title" class="challenge">
            <div class="challenge_header">
              <i class="material-icons">{{missionType.icon}}</i>
              <span> {{missionType.title}} </span>
            </div>
            <div v-for="quest in pastQuests" v-if="quest.questType === missionType.type" v-bind:key="quest.questId" class="challenge_topic"> 
              <q-collapsible :label="quest.name" style="width: 100%;">
                <div>
                  <p>{{quest.description}}</p>
                  <div class="card_footer">
                    <div class="finished">
                      <p>Terminou em: </p>
                      <p style="color: red">{{formatDate(quest.endDate)}}</p>
                    </div>
                    <div>
                      <span class="success_label" v-if="getQuestFinishedLabel(quest, questsCompleted)">Concluída</span>
                      <span class="failure_label" v-else>Não Concluída</span>
                    </div>
                  </div>
                </div>
              </q-collapsible>
            </div>
          </div>
        </div>
      </q-tab-pane>
    </q-tabs>
  </div>
</template>

<style scoped>
.finished p{
  margin:0;
  text-align: center;
}
.challenge-page .q-tabs {
  border-top: 2px  var(--q-color-dark) solid !important;
}
.challenge-page .q-tab-pane {
  height: calc(100vh - 100px);
  background-color: #BFC7DA !important;
  padding: 0px 0px;
  overflow: auto;
}
.success_label {
  background-color: green;
  color: white;
  padding: 7px;
  font-size: 15px;
  border-radius: 4px;
}
.failure_label {
  background-color: red;
  color: white;
  padding: 7px;
  font-size: 15px;
  border-radius: 4px;
  text-align: center;
}
.card_footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h1 {
  color: blue
}
.q-collapsible .q-item-label {
  display: flex;
  color: var(--q-color-dark);
  overflow: show;
} 
.q-tab{
  font-family: 'Adventuring';
}
.challenge_screen {
  background-color: #BFC7DA;
  height: 100%;
  font-family: 'Adventuring';
}
.challenge_header{
  display: flex;
  height: 50px;
  align-items: center;
  font-size: 15px;
  color: var(--q-color-dark);
  padding: 4px 8px;
  background-color: #ffffff
}
.challenge_header span{
  margin-left: 5px;
}
.challenge_topic{
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  margin: 10px;
  font-size: 12px;
  color: var(--q-color-dark);;
  border-radius: 4px;
  padding: 5px;
}
.challenge_topic span{
  display: inline-block;
}
i{
  color: var(--q-color-dark);
  font-size: 20px;
}
.modal--readQR {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-family: 'Adventuring';
}
.qr_modal_sentence{
  font-size: 30px;
  color: var(--q-color-dark);
}
.tab-qr{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.tab-qr .tab-senha .q-btn{
  width: 90vw;
}
.tab-senha{
  font-family: 'Adventuring';
  color: var(--q-color-dark);
  height: 70vh;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.completed_quest{
  font-size: 20px;
  color: green;
}
</style>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';
import { mapGetters, mapActions } from 'vuex';
import checkedIcon from '../assets/checked.png';
import cancelIcon from '../assets/cancel.png';
import moment from 'moment';
import store from '../store';
import Router from '../router'
let auth_uri = 'https://bixoquest.icmc.usp.br';
export default {
  computed: mapGetters ([
    'activeQuests',
    'pastQuests',
    'questsCompleted',
    'token',
    'isUserLogged'
  ]),
  mounted() {
    if (!this.isUserLogged) {
      Router.push({name: 'Home'});
    } else {
      this.callLoadQuests();
    }
  },
  methods: {
    ...mapActions(['loadPastQuests', 'loadActiveQuests']),
    formatDate: function(date) {
      return moment(date).utc().format("DD-MM-YYYY HH:mm");
    },
    getQuestFinishedLabel(quest, questsCompleted) {
      return questsCompleted.some(questCompleted => questCompleted === quest.questId);
    },
    onDecode(decodedString) {
      axios
      .post(auth_uri + '/api/quests/validate', {
        questId: this.currentQuest.questId,
        code: decodedString
      },{
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      })
      .then(response => {
        this.qrFound = true;
        store.commit('updateUserData', response.data);
        this.$q.notify({
          message: 'Quest concluída! Recompensa:' + 
            (this.currentQuest.rewardPoints > 0 ? (' ' + this.currentQuest.rewardPoints + ' Pontos') : '') +
            (((this.currentQuest.rewardPoints > 0) && (this.currentQuest.rewardPacks > 0)) ? ' e': '') +
            (this.currentQuest.rewardPacks > 0 ? (' ' + this.currentQuest.rewardPacks + ' Pacote') : ''),
          type: 'positive',
          timeout: 3000,
          position: 'top',
          closeBtn: 'X'
        });
        this.closeModal();
      })
      .catch(error => {
        this.closeModal();
        this.$q.notify({
          message: 'Código inválido, tente novamente!',
          icon: 'warning',
          timeout: 3000,
          position: 'top',
          closeBtn: 'X'
        });
      })
    },
    openModal(quest) {
      this.openReader = true;
      this.currentQuest = quest;
    },
    closeModal() {
      this.openReader = false;
      this.qrFound = false;
      this.pauseQR = false;
      this.inserted = '';
    },
    callLoadQuests() {
      this.loadActiveQuests();
      this.loadPastQuests();
    }
  },
  components: {
    QrcodeStream,
  },
  data: function () {
    return {
      inserted: '',
      qrFound: false,
      pauseQR: false,
      currentQuest: {},
      openReader: false,
      checkedIcon: checkedIcon,
      cancelIcon: cancelIcon,
      missionTypes: 
        [{
          title: 'Missões de Eventos',
          icon: 'calendar_today',
          type: 'event',
        }, {
          title: 'Missões de Check-in',
          icon: 'pin_drop',
          type: 'checkin',
        },
      ],
    }
  }
}
</script>