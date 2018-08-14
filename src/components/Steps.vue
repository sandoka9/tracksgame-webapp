/* eslint-disable */
<template>
  <div id="steps">
    <TracksAudio v-bind:content="questions[stepIndex]" v-if="questions[stepIndex].type == 'audio'"></TracksAudio>
    <TracksEnigme v-on:moreIndex="moreIndex" v-bind:cluesKey="cluesKey" v-bind:stepIndexEnd="stepIndexEnd"
                  v-bind:content="questions[stepIndex]" v-bind:cluesFound="cluesFound"
                  v-if="questions[stepIndex].type == 'enigme'"></TracksEnigme>
    <TracksEnigmeMap v-on:moreIndex="moreIndex" v-on:nextStep="nextStep"
                    v-bind:stepIndexEnd="stepIndexEnd" v-bind:cluesKey="cluesKey"
                    v-bind:content="questions[stepIndex]" v-bind:cluesFound="cluesFound"
                    v-if="questions[stepIndex].type == 'enigmeMap'">
    </TracksEnigmeMap>
    <TracksFinal v-bind:content="questions[stepIndex]" v-if="questions[stepIndex].type == 'final'"></TracksFinal>
    <TracksIntro v-bind:content="questions[stepIndex]" v-if="questions[stepIndex].type == 'intro'"></TracksIntro>
    <TracksMap v-bind:content="questions[stepIndex]" v-if="questions[stepIndex].type == 'map'"></TracksMap>
    <TracksMapIn v-bind:content="questions[stepIndex]" v-if="questions[stepIndex].type == 'map-in'"></TracksMapIn>
    <TracksPuzzle v-bind:content="questions[stepIndex]" v-if="questions[stepIndex].type == 'puzzle'"></TracksPuzzle>
    <TracksQcm v-model="checkedNames" v-bind:content="questions[stepIndex]" v-if="questions[stepIndex].type == 'qcm'"></TracksQcm>
    <TracksQrcode v-bind:content="questions[stepIndex]" v-if="questions[stepIndex].type == 'qrcode'"></TracksQrcode>
    <TracksVideo v-bind:content="questions[stepIndex]" v-if="questions[stepIndex].type == 'video'"></TracksVideo>
    <div class="result"  v-if="questions[stepIndex].type !== 'enigmeMap' && (error == true || win == true)">
      <i class="far fa-times-circle" v-on:click="close"></i>
      <div class="result-nok error-msg" v-if="error == true && typeof(questions[stepIndex].errorMsg[errorNb]) !== 'undefined'" v-on:click="close">
        {{questions[stepIndex].errorMsg[errorNb]}}
        {{checkedNames}}
      </div>
      <div class="result-nok error-msg" v-else-if="error == true && cluesKey > 0" >
        {{questions[stepIndex].errorMsg[0]}}
      </div>
      <div class="result-ok win-msg" v-else-if="error == true" >
        Vous avez récupéré tous les indices. Maintenant à vous de jouer !
      </div>
      <div class="result-ok win-msg" v-if="win == true">
        {{questions[stepIndex].winMsg}}
        <div class="result-ok-clues" v-if="enigmaType == 'response' && questions[stepIndex].type != 'enigme'">{{clues[cluesKey]}}</div>
        <div class="result-ok-cluesMap" v-if="enigmaType == 'map'"><img :src="clues[cluesKey]" /></div>
      </div>
    </div>
    <div class="arrow">
        <span class="arrow-right" v-if="questions[stepIndex].type == 'map-in'" v-on:click="nextStep">
        Visualiser la carte</span>
        <i :class="questions[stepIndex].classe" v-on:click="nextStep"></i>
        <i class="fa fa-arrow-circle-left" v-on:click="previous" v-if="stepIndex > 0"></i>
    </div>
  </div>

</template>

<script>
import baseCheckbox from './baseCheckbox.vue'
import draggable from 'vuedraggable'
import TracksAudio from './TracksAudio.vue'
import TracksEnigme from './TracksEnigme.vue'
import TracksEnigmeMap from './TracksEnigmeMap.vue'
import TracksFinal from './TracksFinal.vue'
import TracksIntro from './TracksIntro.vue'
import TracksMap from './TracksMap.vue'
import TracksMapIn from './TracksMapIn.vue'
import TracksPuzzle from './TracksPuzzle.vue'
import TracksQcm from './TracksQcm.vue'
import TracksQrcode from './TracksQrcode.vue'
import TracksVideo from './TracksVideo.vue'

// import * as CONFIG from './config.js'
import GameRepository from '../services/GameRepository.js'

export default {
  name: 'Steps',
  props: ['gameId'],
  data () {
    return {
      audioResponse: '',
      checkedNames: '',
      cluesFound: {},
      cluesKey: '0',
      color: '',
      consoleObj: 'start',
      enigmaType: '',
      error: false,
      errorInfo: {
        'nb': this.errorNb,
        'stepIndex': this.stepIndex,
        'stepEnigme': 0
      },
      errorMsg: '',
      errorNb: 0,
      questions: [],
      questionType1: ['map', 'map-in', 'intro'],
      questionType2: ['audio', 'qrcode', 'video', 'enigme'],
      stepIndex: 0,
      stepIndexBonus: 0,
      stepIndexMax: 0,
      stepIndexEnd: false,
      title: '',
      win: false
    }
  },
  components: {
    draggable,
    baseCheckbox,
    TracksAudio,
    TracksEnigme,
    TracksEnigmeMap,
    TracksFinal,
    TracksIntro,
    TracksMapIn,
    TracksMap,
    TracksPuzzle,
    TracksQcm,
    TracksQrcode,
    TracksVideo
  },
  created: function () {
    this.fetchData()
  },
  mounted: function () {
  },
  methods: {
    close: function () {
      if (this.error === true && this.errorNb < 3) {
        this.error = false
        return false
      } else if (this.error === true) {
        this.error = false
        this.errorNb = 0
      } else {
        this.cluesFound[this.cluesKey] = this.clues[this.cluesKey] /* string() */
        delete this.clues[this.cluesKey]
      }
      /* If go next step
      set errorInfo['stepEnigme'] stock la step de l'enigme
      stepIndexBonus stock la step bonus réalisée */
      if (this.stepIndex > this.errorInfo['stepEnigme'] + 1 && this.errorInfo['stepEnigme'] !== 0) {
        this.stepIndexBonus = this.stepIndex
        this.stepIndex = this.errorInfo['stepEnigme']
      } else {
        this.stepIndex++
      }
      this.win = false
      /* If no more questions stepIndexMax = nb questions */
      if (this.stepIndexBonus === this.stepIndexMax) {
        this.stepIndexEnd = true
      }
      return true
    },
    fetchData: function () {
      var that = this
      GameRepository.getGame(this.gameId).then(data => {
        // console.debug(data)
        that.title = data.title
        that.description = data.description
        that.color = data.color
        that.questions = data.questions
        that.clues = data.clues
        that.enigmaType = data.enigmaType
        that.stepIndexMax = data.questions.length - 1
      })
        .catch(error => console.error('toto : ' + error))
    },
    getClues: function () {
      if (this.questions[this.stepIndex].indice !== '') {
        return this.questions[this.stepIndex].indice
      } else {
        return (Object.keys(this.clues)[0] ? Object.keys(this.clues)[0] : '')
      }
    },
    moreIndex () {
      this.errorInfo['stepEnigme'] = this.stepIndex
      if (this.stepIndexBonus > 0) {
        this.stepIndex = this.stepIndexBonus + 1
      } else {
        this.stepIndex = this.stepIndex + 2
      }
    },
    nextStep: function () {
      let cluesKeyTemp = this.getClues()
      this.cluesKey = String(cluesKeyTemp)
      if (this.questionType1.indexOf(this.questions[this.stepIndex].type) > -1) {
        this.stepIndex++
        return
      }
      if (this.questions[this.stepIndex].type === 'qcm') {
        if (this.checkedNames === this.questions[this.stepIndex].QResponse) {
          this.win = true
          this.error = false
        } else {
          this.error = true
          this.errorNb++
        }
        return
      }
      if (this.questions[this.stepIndex].type === 'puzzle') {
        for (var i = 1; i < 9; i++) {
          if (this.questions[this.stepIndex].puzzleImage[i].order < this.questions[this.stepIndex].puzzleImage[i - 1].order) {
            this.error = true
            this.errorNb++
            return
          }
        }
        this.win = true
        this.error = false
        return
      }
      if (this.questions[this.stepIndex].type === 'enigmeMap') {
        if (this.questions[this.stepIndex].response === this.questions[this.stepIndex].QResponse) {
          this.stepIndex++
        }
        return
      }
      if (this.questionType2.indexOf(this.questions[this.stepIndex].type) > -1) {
        if (this.questions[this.stepIndex].response.toLowerCase().trim() === this.questions[this.stepIndex].QResponse) {
          this.win = true
          this.error = false
        } else {
          this.error = true
          this.errorNb++
        }
        return
      }
      if (this.questions[this.stepIndex].type === 'next') {
        this.errorInfo['stepEnigme'] = this.stepIndex
      }
    },
    previous: function () {
      if (this.errorInfo['stepEnigme'] !== 0 && this.stepIndex > this.errorInfo['stepEnigme'] + 1) {
        this.stepIndex = this.stepIndex - 2
      } else {
        this.stepIndex--
      }
      this.error = false
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@font-face {
   font-family: myFirstFont;
   src: url(../../static/fonts/sansation/Sansation-Regular.ttf);
}

@font-face {
   font-family: myFirstFont;
   src: url(../../static/fonts/sansation/Sansation-Bold.ttf);
   font-weight: bold;
}

@font-face {
   font-family: myFirstFont;
   src: url(../../static/fonts/sansation/Sansation-Light.ttf);
   font-weight: normal;
}

* {
   font-family: myFirstFont;
}
.steps{
  background-color: white;
  font-size: 4vw;
}

.content{
  padding: 5%;
  padding-top: 0;
}

.content-title{
  font-weight: bold;
  font-size: 6vw;
  width: 100%;
  float: left;
}

.content-subtitle{
  font-size: 6.5vw;
  width: 100%;
  float: left;
}

.content-description{
  width: 100%;
  float: left;
  margin-bottom:10%;
  font-size:5vw;
}

.content-game{
  font-size:5vw;
}

.content-response{
  z-index:100;
  width: 100%;
  float: left;
  font-size:5vw;
}

.result{
  background-color: #DEF333; /* Yellow violet #93329E*/
  color: black;
  min-height: 25%;
  width: 90%;
  float: left;
  padding: 5%;
  -webkit-box-shadow: 0px 8px 4px 0px #565D21; /* shadow yellow shadow violet #431F46*/
  -moz-box-shadow: 6px 12px 4px 0px #565D21;
  filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=0, OffY=8, Color='#D4DADF', Positive='true');
  zoom:1;
  box-shadow: 6px 8px 4px 0px #565D21;
  top: 250px;
  left: 20px;
  position: absolute;
  opacity: 0.9;
  border: 1px solid #565D21;
  z-index: 100;
  font-size:5vw;
}

.result > i{
  float: right;
  color:  white;
  font-size: 6vw;
  padding-left: 5%
}
.result-nok{
  text-align:justify;
  vertical-align: middle;
  font-size:5vw;
}
.result-nok-clues{
  margin-top:10%;
  text-align: center;
  text-decoration: underline;
  font-weight: bold;
  font-size:5vw;
}
.result-nok-clues:hover{
  color: red;
}
.result-ok{
  color: black;
  /* padding-right: 5vh; */
  font-size:5vw;
}
.result-ok-clues{
  margin-top: 10%;
  background-color: white;
  color: black;
  text-align: center;
  margin-right: 10%;
  margin-left: 15%;
  font-weight: bold;
  border-bottom: 1px solid #565D21;
  border-right: 1px solid #565D21;
  border-radius: 2px;
  font-size:5vw;
}
.result-ok-cluesMap img{
  width: 150px;
  margin-top: 10%;
  margin-left: 15%;
}
.arrow{
  float: left;
  width: 100%;
  top: 80%;
  position: absolute;
  padding-right: 5%;
  padding-left: 5%;
  font-size: 7vw
}
.fa-times-circle{
  color: black;
}

.fa-arrow-circle-right{
  float:right;
}

.fa-map-marked-alt{
  float: right;
  margin-right: 2%
}

.fa-arrow-circle-right:hover .fa-map-marked-alt:hover{
  color:#2899a8; /* light blue */
}

.fa-map-o{
  float:right;
  padding-right: 3vh;
}

.fa-map-o:hover{
  color:#2899a8; /* light blue */
}

.fa-check{
  float:right;
}

.fa-check:hover{
  color:#2899a8; /* light blue */
}

.arrow-right {
  float: right;
  font-size: 5vw;
  padding-right: 3vh;
}
.arrow-right:hover {
  color:#2899a8; /* light blue */
}
.fa-arrow-circle-left{
  float:left;
}
.fa-arrow-ciecle-left:hover {
  color:#2899a8; /* light blue */
}

.description-bloc {
  font-size:1vw; /*  1.5rem; */
  /* background-desc: #FFE4C4; /* #CEFF33; */
  /* min-height: 70vh; */
  padding-top: 5vh;
  padding-left: 1vh;
}

</style>
