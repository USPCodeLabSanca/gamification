<template>
  <div style="margin-top: 49px">
    <q-tabs underline-color="indigo-10">
      <q-tab default slot="title" name="tab-1">Disponíveis</q-tab>
      <q-tab slot="title" name="tab-2">Finalizadas</q-tab>
      <q-tab-pane name="tab-1">
        <div class="challenge_screen">
          <div v-for="missionType in missionTypes" v-bind:key="missionType.title" class="challenge">
            <div class="challenge_header" v-on:click="alertTest">
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
                    <router-link to="/qrcodereader">
                      <q-btn :label="getQuestButtonLabel(quest)" @click="handleClick(quest)"/>
                    </router-link>
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
.q-btn {
  background-color: var(--q-color-primary);
  color: white;
}
h1 {
  color: blue
}
.q-collapsible .q-item-label {
  color: var(--q-color-dark);
} 
.q-tab{
  font-family: 'Adventuring';
}
.challenge_screen {
  background-color: #BFC7DA;
  height: 100vh;
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
.challenge_header img{
  height: 100%;
  weight: 50px;
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
.challenge_topic img{
  height: 15px;
  weight: 15px;
}
i{
  color: var(--q-color-dark);
  font-size: 20px;
}
</style>

<script>
import { mapGetters } from 'vuex';
import checkedIcon from '../assets/checked.png';
import cancelIcon from '../assets/cancel.png';
import moment from 'moment';
export default {
  computed: mapGetters ([
    'activeQuests',
    'pastQuests',
    'questsCompleted',
  ]),
  methods: {
    alertTest: function() {
      console.log(this.quests);
    },
    formatDate: function(date) {
      return moment(date).format("DD-MM-YYYY hh:mm");
    },
    getQuestButtonLabel: function(quest) {
      if(quest.questType === 'checkin') return 'Ler QRCode';
      return 'Inserir Senha';
    },
    getQuestFinishedLabel(quest, questsCompleted) {
      return questsCompleted.some(questCompleted => questCompleted === quest.questId);
    },
    handleClick(quest) {
      commit('currentQuest',quest);
    }
  },
  data: function () {
    return {
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