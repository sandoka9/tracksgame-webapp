/* eslint-disable */
<template>
  <div id="steps">
    <TracksAudio v-bind:content="questions[stepIndex]" v-if="questions[stepIndex].type == 'audio'"></TracksAudio>
    <TracksEnigme v-on:moreIndex="moreIndex" v-bind:cluesKey="cluesKey" v-bind:content="questions[stepIndex]" v-bind:cluesFound="cluesFound" v-if="questions[stepIndex].type == 'enigme'"></TracksEnigme>
    <TracksEnigmeMap v-on:moreIndex="moreIndex" v-on:nextStep="nextStep"
                    v-bind:stepIndexEnd="stepIndexEnd" v-bind:cluesKey="cluesKey" v-bind:content="questions[stepIndex]" v-bind:cluesFound="cluesFound"
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
      <div class="result-nok error-msg" v-if="error == true && typeof(questions[stepIndex].errorMsg[errorNb]) !== 'undefined'" v-on:click="close">
        {{questions[stepIndex].errorMsg[errorNb]}}
        <div class="result-nok-clues">Close</div>
      </div>
      <div class="result-nok error-msg" v-else-if="error == true" v-on:click="close">
        {{questions[stepIndex].errorMsg[0]}}
        <div class="result-nok-clues">Close</div>
      </div>
      <div class="result-ok win-msg" v-if="win == true && cluesKey > 0" v-on:click="close" >
        {{questions[stepIndex].winMsg}}
        <div class="result-ok-clues" v-if="enigmaType == 'response'">{{clues[cluesKey]}}</div>
        <div class="result-ok-cluesMap" v-if="enigmaType == 'map'"><img :src="clues[cluesKey]" /></div>
      </div>
      <div class="result-ok win-msg" v-else-if="win == true" v-on:click="close" >
        Vous avez récupéré tous les indices. Maintenant à vous de jouer !
      </div>
    </div>
    <div class="arrow">
        <span class="arrow-right" v-if="questions[stepIndex].type == 'map-in'" v-on:click="nextStep">Visualiser la carte</span>
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

import * as CONFIG from './config.js'

import $ from 'jquery'
var jsonPath = ''

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
  created: function () {
    this.fetchData()
  },
  methods: {
    close: function () {
      console.log(this.stepIndexEnd)
      console.log(this.stepIndexMax)
      if (this.stepIndexBonus === this.stepIndexMax) {
        this.stepIndexEnd = true
      }
      if (this.error === true && this.errorNb < 3) {
        console.log('yes close 1')
        this.error = false
      } else if (this.error === true) {
        console.log('yes close 2')
        this.error = false
        this.errorNb = 0
        this.stepIndex++
      } else {
        console.log('yes close 3')
        this.cluesFound[this.cluesKey] = this.clues[this.cluesKey] /* string() */
        delete this.clues[this.cluesKey]
        if (this.stepIndex > this.errorInfo['stepEnigme'] + 1 && this.errorInfo['stepEnigme'] !== 0) {
          this.stepIndexBonus = this.stepIndex
          this.stepIndex = this.errorInfo['stepEnigme']
        } else {
          this.stepIndex++
        }
        this.win = false
      }
    },
    fetchData: function () {
      /* var flickerAPI = 'img/louvre/content.json' 'https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?' 'img/louvre/content.json' */
      jsonPath = CONFIG.API_URL + '/' + this.gameId + '/public/tgame.json'
      console.log(jsonPath)
      jsonPath = 'img/louvre/content.json/'
      $.getJSON(jsonPath, (data) => {
        this.title = data.title
        this.description = data.description
        this.color = data.color
        this.questions = data.questions
        this.clues = data.clues
        this.enigmaType = data.enigmaType
        this.stepIndexMax = this.questions.length - 1
      })
    },
    getClues: function () {
      console.log('getClues')
      if (this.questions[this.stepIndex].indice !== '') {
        console.log('getClues indice')
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
        console.log('plop')
        this.stepIndex++
        return
      }
      console.log(this.questions[this.stepIndex].type)
      if (this.questions[this.stepIndex].type === 'qcm') {
        console.log('yes QCM')
        console.log(this.checkedNames)
        if (this.checkedNames === this.questions[this.stepIndex].QResponse) {
          console.log('WIN')
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
        console.log('yes 1')
        if (this.questions[this.stepIndex].response.toLowerCase().trim() === this.questions[this.stepIndex].QResponse) {
          console.log('yes 1')
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
  },
  /* mounted () {
    this.$nextTick(() => {
      console.log(CONFIG.API_URL)
    })
  },
  */
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@font-face {
   font-family: myFirstFont;
   src: url(../assets/fonts/sansation/Sansation-Regular.ttf);
}

@font-face {
   font-family: myFirstFont;
   src: url(../assets/fonts/sansation/Sansation-Bold.ttf);
   font-weight: bold;
}

@font-face {
   font-family: myFirstFont;
   src: url(../assets/fonts/sansation/Sansation-Light.ttf);
   font-weight: normal;
}

* {
   font-family: myFirstFont;
}
.step{
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
  font-size: 8vw;
  width: 100%;
  float: left;
}

.content-description{
  width: 100%;
  float: left;
}

.content-response{
  width: 100%;
  float: left;
}

.result{
  min-height: 25%;
  width: 100%;
  float: left;
  padding: 5%;
  background-color:white;
  -webkit-box-shadow: 0px 8px 4px 0px #D4DADF; /* light gre y*/
  -moz-box-shadow: 6px 12px 4px 0px #D4DADF;
  filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=0, OffY=8, Color='#D4DADF', Positive='true');
  zoom:1;
  box-shadow: 6px 8px 4px 0px #D4DADF;
  top: 250px;
  left: 20px;
  position: absolute;
  opacity: 0.9;
  border: 1px solid #D4DADF;
}
.result-nok{
  text-align:justify;
}
.result-nok-clues{
  margin-top:10%;
  text-align: center;
  text-decoration: underline;
  font-weight: bold;
}
.result-nok-clues:hover{
  color: red;
}
.result-ok{
  color: white;
  padding-right: 5vh;
  padding-top: 5vh;
}
.result-ok-clues{
  margin-top: 5vh;
  background-color: #ccc7c7;
  color: red;
  text-align: center;
  margin-right: 5vh;
}
.result-ok-cluesMap__img{
  width: 15vh;
  height: 10vh;
  margin-top: 0.2vh;
  margin-left: 10vh;
}
.arrow{
  float: left;
  width: 100%;
  top: 80%;
  position: absolute;
  padding-right: 10%;
  padding-left: 10%;
}

.fa-arrow-circle-right{
  float:right;
  font-size: 4vw;
}
.fa-arrow-circle-right:hover{
  color:#2899a8; /* light blue */
}
.fa-map-o{
  float:right;
  padding-right: 3vh;
  font-size: 4vw;
}
.fa-map-o:hover{
  color:#2899a8; /* light blue */
}
.arrow-right {
  float: right;
  font-size: 3vw;
  padding-right: 3vh;
}
.arrow-right:hover {
  color:#2899a8; /* light blue */
}
.fa-arrow-circle-left{
  float:left;
  font-size: 4vw;
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
