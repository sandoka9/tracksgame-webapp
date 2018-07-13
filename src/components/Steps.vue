/* eslint-disable */
<template>
  <div id="steps">
    <TracksIntro  v-model="lovingVue" v-bind:content="questions[stepIndex]" v-if="questions[stepIndex].type == 'intro'"></TracksIntro>
    <!-- <TracksIntro v-bind:content="questions[stepIndex]" v-if="questions[stepIndex].type == 'intro'"></TracksIntro> -->
    <TracksMapIn v-bind:content="questions[stepIndex]" v-if="questions[stepIndex].type == 'map-in'"></TracksMapIn>
    <TracksMap v-bind:content="questions[stepIndex]" v-if="questions[stepIndex].type == 'map'"></TracksMap>
    <TracksQcm v-model="checkedNames" v-bind:content="questions[stepIndex]" v-if="questions[stepIndex].type == 'qcm'"></TracksQcm>
    <TracksPuzzle v-bind:content="questions[stepIndex]" v-if="questions[stepIndex].type == 'puzzle'"></TracksPuzzle>
    <TracksAudio v-bind:content="questions[stepIndex]" v-if="questions[stepIndex].type == 'audio'"></TracksAudio>
    <TracksEnigme v-bind:content="questions[stepIndex]" v-if="questions[stepIndex].type == 'enigme'"></TracksEnigme>
    <TracksFinal v-bind:content="questions[stepIndex]" v-if="questions[stepIndex].type == 'final'"></TracksFinal>
    <div class="error-msg" v-if="error == true && typeof(questions[stepIndex].errorMsg[errorNb]) !== 'undefined'" v-on:click="close">
      {{questions[stepIndex].errorMsg[errorNb]}}
      <div class="indice">Close</div>
    </div>
    <div class="error-msg" v-else-if="error == true" v-on:click="close">
      {{questions[stepIndex].errorMsg[0]}}
      <div class="indice">Close</div>
    </div>
    <div class="win-msg" v-if="win == true"  v-on:click="close">
      {{questions[stepIndex].winMsg}}
      <div class="indice">{{questions[stepIndex].indice}}</div>
    </div>
    <div v-on:click="next">
      <span class="suite-text" v-if="questions[stepIndex].type == 'map-in'">Visualiser la carte</span>
      <i :class="questions[stepIndex].classe"></i>
    </div>
    <div v-on:click="previous" v-if="stepIndex > 2">
      <i :class="left"></i>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import TracksIntro from './TracksIntro.vue'
import TracksMapIn from './TracksMapIn.vue'
import TracksMap from './TracksMap.vue'
import TracksQcm from './TracksQcm.vue'
import TracksPuzzle from './TracksPuzzle.vue'
import TracksAudio from './TracksAudio.vue'
import TracksEnigme from './TracksEnigme.vue'
import TracksFinal from './TracksFinal.vue'
import baseCheckbox from './baseCheckbox.vue'
import $ from 'jquery'
var apiURL = 'img/louvre/content.json'

export default {
  name: 'Steps',
  data () {
    return {
      lovingVue: '',
      checkedNames: '',
      titleBold: [],
      title: '',
      description2: '',
      color: '',
      stepIndex: 0,
      questions: [],
      audioResponse: '',
      items: [],
      left: 'fa fa-arrow-left',
      error: false,
      errorMsg: '',
      errorNb: 0,
      win: false,
      indices: [],
      res: [],
      editable: true,
      isDragging: false,
      delayedDragging: false,
      stepAllow: [
        true
      ]
    }
  },
  created: function () {
    this.fetchData()
  },
  methods: {
    previous: function () {
      this.stepIndex--
      this.error = false
    },
    afficherIndice () {
      var index = 0
      this.stepIndex++
      var lg = this.indices.length
      for (var i = 0; i < lg; i++) {
        if (this.indices[i] !== '') {
          index = Number(this.indices[i])
          this.res[index] = this.indice[index]
        }
      }
      return this.res
    },
    close: function () {
      if (this.error === true) {
        this.error = false
        this.indices.push('')
      } else {
        this.indices.push(this.stepIndex)
        this.stepIndex++
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
        console.log(this.title2, this.description2, this.color2)
      })
    },
    playSound (sound) {
      if (sound) {
        var audio = new Audio(sound)
        audio.play()
      }
    },
    next: function () {
      if (this.questions[this.stepIndex].type === 'qcm') {
        if (this.checkedNames !== this.questions[this.stepIndex].qcmResponse && this.errorNb === 2) {
          /* Step 5 */
          this.error = true
          this.errorNb = 0
          /* this.errorMsg = 'Perdu. Passe à l\'étape suivante ! Le jeu continu, il y a encore plein d\'indices à découvrir ' */
        } else if (this.checkedNames !== this.questions[this.stepIndex].qcmResponse && this.errorNb === 1) {
          /* this.errorMsg = 'Non, ce n\'est pas ' + this.checkedNames + '. Attention, C\'est ta dernière chance !' */
          this.stepIndex--
          this.error = true
          this.errorNb++
        } else if (this.checkedNames !== this.questions[this.stepIndex].qcmResponse) {
          this.stepIndex--
          this.error = true
          this.errorNb++
          /* this.errorMsg = 'Non, ce n\'est pas ' + this.checkedNames + '. Retente ta chance !' */
          /* Step 4+1 */
        } else {
          this.win = true
          this.stepIndex--
          this.error = false
        }
      }
      if (this.questions[this.stepIndex].type === 'puzzle') {
        for (var i = 1; i < 9; i++) {
          if (this.questions[this.stepIndex].puzzleImage[i].order < this.questions[this.stepIndex].puzzleImage[i - 1].order) {
            this.error = true
            /* this.errorMsg = 'Non, essaie encore une fois' */
            this.errorNb++
            this.stepIndex--
            break
          }
        }
        if (this.error === false) {
          this.win = true
          this.stepIndex--
        } else if (this.errorNb > 2) {
          this.error = false
          this.errorNb = 0
          this.stepIndex++
        }
      }
      if (this.questions[this.stepIndex].type === 'audio' && (this.audioResponse.toLowerCase().trim() === this.questions[this.stepIndex].audioResponse)) {
        this.win = true
        this.stepIndex--
        this.error = false
      } else if (this.stepIndex === 5 && this.errorNb < 3) {
        this.stepIndex--
        this.error = true
        this.errorNb++
      /* this.errorMsg = 'Petit indice supplémentaire, j\'adore les clairs de lune...' */
      } else if (this.stepIndex === 5) {
        this.error = true
        this.errorNb++
        /* this.errorMsg = 'Non toujours pas.' */
      }
      this.stepIndex = this.stepIndex + 1
    }
  },
  components: {
    draggable,
    TracksIntro,
    TracksMapIn,
    TracksMap,
    TracksQcm,
    TracksPuzzle,
    TracksAudio,
    TracksEnigme,
    TracksFinal,
    baseCheckbox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
    font-family: fantasy;
    margin-top: 1vh;
    font-size: 4rem;
}

button.btn.btn-light {
    font-size: 1.5rem;
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
  font-size:0.5rem; /*  1.5rem; */
  background-color: #FFE4C4; /* #CEFF33; */
  min-height: 70vh;
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
  background-color: #ff6600;
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
  font-size: 3rem;
  float: left;
  margin-top: 7vh;
  padding-right:1vh;
}

.fa.fa-play-circle-o {
    font-size: 6rem;
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

input.input-solution {
    border: none;
    font-size: x-large;
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
  font-size: 1.5rem;
}

.suite-text {
  font-size: 1.5rem;
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
  background-color: #206040;
  color: white;
  padding-right: 5vh;
  padding-top: 5vh;
}

</style>
