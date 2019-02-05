<template>
  <div>
    <h1>Home</h1>
    <div class="challenge_screen">
      <div v-for="missionType in missionTypes" v-bind:key="missionType.title" class="challenge">
        <div class="challenge_header">
          <img :src="missionType.icon"/>
          <span> {{missionType.title}} </span>
        </div>
        <div v-for="mission in missionType.missions" v-bind:key="mission.id" class="challenge_topic"> 
          <span>{{mission.text}}</span>
          <img :src="mission.checked?checkedIcon:cancelIcon"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: blue
}
.challenge_screen {
  background-color: #BFC7DA;
  height: 100vh;
}
.challenge_header{
  display: flex;
  height: 50px;
  align-items: center;
  font-size: 13px;
  color: #858585;
  padding: 8px;
  background-color: #ffffff
}
.challenge_header span{
  margin-left: 5px;
}
.challenge_header img{
  height: 50px;
  weight: 50px;
}
.challenge_topic{
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  margin: 10px;
  font-size: 12px;
  color: #8289A5;
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
</style>

<script>
import globalIcon from '../assets/global.png';
import calendarIcon from '../assets/calendar.png';
import placeholderIcon from '../assets/placeholder.png';
import checkedIcon from '../assets/checked.png';
import cancelIcon from '../assets/cancel.png';

export default {
  data: function () {
    return {
      checkedIcon: checkedIcon,
      cancelIcon: cancelIcon,
      missionTypes: 
        [{
          title: 'Missões Batatais',
          icon: globalIcon,
          missions: [
            {
              id: 0,
              text: 'Complete a missão Game Night juntamente com 100 amigos para ganhar prêmios',
              checked: true,
            },
          ],
        }, {
          title: 'Missões de Eventos',
          icon: calendarIcon,
          missions: [
            {
              id: 0,
              text: 'Game Night Challenge',
              checked: false,
            },
            {
              id: 1,
              text: `Assista a palestra 'vida de jogos'`,
              checked: false,
            },
            {
              id: 2,
              text: 'Converse com NPC Rufus Lenhador',
              checked: true,
            },
          ],
        }, {
          title: 'Missões de Check-in',
          icon: placeholderIcon,
          missions: [
            {
              id: 0,
              text: 'Visite a Biblioteca do ICMC',
              checked: false,
            },
            {
              id: 1,
              text: 'Conheça o Bandejão',
              checked: true,
            },
          ],
        },
      ],
    }
  }
}
</script>