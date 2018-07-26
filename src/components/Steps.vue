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
    <div class="error-msg" v-if="error == true && typeof(questions[stepIndex].errorMsg[errorNb]) !== 'undefined'" v-on:click="close">
      {{questions[stepIndex].errorMsg[errorNb]}}
      <div class="indice">Close</div>
    </div>
    <div class="error-msg" v-else-if="error == true" v-on:click="close">
      {{questions[stepIndex].errorMsg[0]}}
      <div class="indice">Close</div>
    </div>
    <div class="win-msg" v-if="win == true && cluesKey > 0" v-on:click="close" >
      {{questions[stepIndex].winMsg}}
      <div class="indice" v-if="enigmaType == 'response'">{{clues[cluesKey]}}</div>
      <div class="indiceMap" v-if="enigmaType == 'map'"><img :src="clues[cluesKey]" /></div>
    </div>
    <div class="win-msg" v-else-if="win == true" v-on:click="close" >
      Vous avez récupéré tous les indices. Maintenant à vous de jouer !
    </div>
    là
    <div v-on:click="nextStep">
      <span class="suite-text" v-if="questions[stepIndex].type == 'map-in'">Visualiser la carte</span>
      <i :class="questions[stepIndex].classe"></i>
    </div>
    <div v-on:click="previous" v-if="stepIndex > 0">
      <i class="fa fa-arrow-left"></i>
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

import $ from 'jquery'
var apiURL = 'img/louvre/content.json'

export default {
  name: 'Steps',
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
      $.getJSON(apiURL, (data) => {
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
          this.win = true
          this.error = false
        } else {
          this.error = true
          this.errorNb++
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
h3 {
    font-family: fantasy;
    margin-top: 1vh;
    font-size: 1rem;
}

button.btn.btn-light {
    font-size: 1rem;
    margin-top: 10vh;
    margin-left: 14vh;
    margin-right: 10vh;
    width: 25vh;
}

.audio {
  margin-top: 10vh;
  margin-left: 20vh;
}

.description-bloc {
  font-size:1rem; /*  1.5rem; */
  /* background-color: #FFE4C4; /* #CEFF33; */
  /* min-height: 70vh; */
  padding-top: 5vh;
  padding-left: 1vh;
}

.error-msg, .win-msg {
  min-height: 45vh;
  min-width: 53vh;
  color: white;
  font-weight: bold;
  padding-top: 15vh;
  padding-left: 5vh;
  margin-right: 1vh;
  /* background-color: #ff6600; */
  -webkit-box-shadow: 0px 8px 4px 0px #a5a4a4;
  -moz-box-shadow: 6px 12px 4px 0px #a5a4a4;
  filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=0, OffY=8, Color='#a5a4a4', Positive='true');
  zoom:1;
  box-shadow: 6px 12px 4px 0px #a5a4a4;
  top: 250px;
  left: 20px;
  position: absolute;
  opacity: 0.9;
}

.fa-arrow-right, .fa-map-o {
  /* font-size: 3rem; */
  float: right;
  margin-top: 7vh;
  padding-right:1vh;
}

.fa-arrow-left {
  font-size: 1rem;
  float: left;
  margin-top: 7vh;
  padding-right:1vh;
}

.fa.fa-play-circle-o {
    font-size: 1rem;
}

.flip-list-move {
  transition: transform 0.5s;
}

.form-control-sm {
  max-height: 0.5vh;
  max-width: 5vh;
}

.form-control {
  max-width: 50vh;
  margin-top: 10vh;
  margin-left: 8vh;
}

.info {
  margin-top:5vh;
}

.indice {
  margin-top: 5vh;
  background-color: #ccc7c7;
  color: red;
  text-align: center;
  margin-right: 5vh;
}

.indiceMap img {
  width: 15vh;
  height: 10vh;
  margin-top: 0.2vh;
  margin-left: 10vh;
}

input.input-solution {
    border: none;
    font-size: 1rem;
    background: #e9fcab;
}

.ghost {
  opacity: .5;
  background: #C8EBFB;
}
/*
.list-group {
  min-height: 20px;
}
*/
.list-group-up .col-md-3{
  background-color: #CEFF33;
    margin-left: 3vh;
}

.list-group-item {
  cursor: move;
  list-style: none;
}

.list-group-item i{
  cursor: pointer;
}

.list-unstyled {
  padding-left: 12vh;
  padding-top: 1vh;
}

.no-move {
  transition: transform 0s;
}

.short-description .description {
  margin-top: 30vh;
}

.short-description {
  /* font-weight: bold; */
}

.randomImg {
  margin: 0.25vh;
  list-style: none;
  display: inline;
}

.randomImg img{
  width: 15vh;
  height: 10vh;
  margin-top: 0.2vh;
}

.response {
  margin-right: 5vh;
  max-width: 35vh;
  font-size: 1rem;
}

.suite-text {
  font-size: 1rem;
  font-weight: bold;
  padding-left: 3vh;
  padding-right: 7vh;
}

/*
.table {
  min-height: 35vh;
  color: #6d6c6c;
  text-align: center;
  border: 1px solid black;
}
*/
.win-msg{
  /* background-color: #206040; */
  color: white;
  padding-right: 5vh;
  padding-top: 5vh;
}

</style>
