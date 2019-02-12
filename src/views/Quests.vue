<template>
  <div>
    <div class="challenge_screen">
      <div class="challenge">
        <div class="challenge_header">
          <img :src="globalIcon"/>
          <span> Missões Globais </span>
        </div>
        <div class="challenge_topic"> 
          <span>Complete a missão Game Night juntamente com 100 amigos para ganhar prêmios</span>
          <img :src="checkedIcon"/>
        </div>
      </div>
      <div class="challenge">
        <div class="challenge_header">
          <img :src="calendarIcon"/>
          <span> Missões de Eventos </span>
        </div>
        <div class="challenge_topic"> 
          <span>Game Night Challenge</span>
          <img :src="cancelIcon"/>
        </div>
        <div class="challenge_topic"> 
          <span>Assista a palestra "vida de jogos"</span>
          <img :src="checkedIcon"/>
        </div>
        <div class="challenge_topic"> 
          <span>Converse com NPC Rufus Lenhador</span>
          <img :src="cancelIcon"/>
        </div>
      </div>
      <div class="challenge">
        <div class="challenge_header">
          <img :src="placeholderIcon"/>
          <span> Missões de Check-in </span>
        </div>
        <div class="challenge_topic"> 
          <span>Visite a Biblioteca do ICMC</span>
          <img :src="checkedIcon"/>
        </div>
        <div class="challenge_topic"> 
          <span>Conheça o Bandejão!</span>
          <img :src="checkedIcon"/>
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
      globalIcon: globalIcon,
      calendarIcon: calendarIcon,
      placeholderIcon: placeholderIcon,
      checkedIcon: checkedIcon,
      cancelIcon: cancelIcon,
    }
  }
}
</script>