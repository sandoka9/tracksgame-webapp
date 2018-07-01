/* eslint-disable */
<template>
  <div id="steps">
      <h2>{{title[stepIndex]}}</h2>
      <div class="description-bloc">
        <TracksMap v-if="stepIndex == 2"></TracksMap>
        <div class="short-description">{{shortDescription[stepIndex]}}</div>
        <div class="description">{{description[stepIndex]}}</div>
        <div class="info" v-if="stepIndex !== 7">
          {{info[stepIndex]}}
        </div> <!-- v-if="stepIndex == 0 || stepIndex == 1"-->
        <div class="info" v-else>
        Le
        <input type="text" class="input-solution" name="jour" value="" /> juin
        <input type="text" class="input-solution" name="annee" value="" />.
        <input type="text" class="input-solution" name="voleur" v-model="res[5]" placeholder="" />
        alias Bog dérobait
        <input type="text" class="input-solution" name="voleur" v-model="res[4]" placeholder="" />
        <input type="text" class="input-solution" name="voleur" v-model="res[3]" placeholder="" />
        <button type="button" class="btn btn-light" v-on:click="stepIndex = stepIndex + 1">Resultat</button>
      </div>
        <div class="puzzle" v-if="stepIndex == 4">
          <div  class="col-md-3">
            <draggable class="list-group-up" element="ul" v-model="puzzles2" :options="dragOptions" :move="onMove">
              <transition-group name="no" tag="ul">
                <li class="randomImg" v-for="element in puzzles2" :key="element.order" >
                  <img :src="element.image" />
                </li>
              </transition-group>
            </draggable>
          </div>
          <div  class="col-md-3">
            <draggable class="list-group" element="ul" v-model="puzzles" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
              <transition-group type="transition" :name="'flip-list'">
                <li class="randomImg" v-for="item in puzzles" :key="item.order">
                  <img :src="item.image" />
                </li>
              </transition-group>
            </draggable>
          </div>
        </div>
        <div class="error-msg" v-if="error == true" v-on:click="close">
          {{errorMsg}}
          <div class="indice">Close</div>
        </div>
        <div class="win-msg" v-if="win == true"  v-on:click="close">
          {{winMsg[stepIndex]}}
          <div class="indice">{{indice[stepIndex]}}</div>
        </div>
        <div class="qcm" v-if="stepIndex == 3">
          <ul id="v-for-object" class="list-unstyled">
            <li v-for="item in painters" :key="item.name" >
              <label v-bind:for="item.surname">
                <input class="radiobtn" type="radio" v-bind:name="item.surname" v-bind:value="item.surname" v-model="checkedNames"/>
                {{ item.name }} {{ item.surname }}
                <span ></span>
              </label>
            </li>
          </ul>
        </div>
        <div v-if="stepIndex == 5">
          <label>
            <button class="audio" @click.prevent="playSound('img/louvre/recording-20180701-171430.mp3')">
              <!-- http://soundbible.com/mp3/Elevator Ding-SoundBible.com-685385892.mp3 -->
              <i class="fa fa-play-circle-o"></i>
            </button>
            Play
          </label>
          <div>
            <input class="response form-control" type="text" name="response" placeholder="Qui suis je ?" v-model="audioResponse" />
          </div>
        </div>
        <div v-if="stepIndex == 6 || stepIndex == 7 ">
          <button type="button" class="btn btn-light" v-if="stepIndex == 6" v-on:click="afficherIndice">Afficher les indices</button>
        </div>
        <div :class=classe[stepIndex] v-on:click="suite">
          <span class="suite-text" v-if="stepIndex == 1">Visualiser la carte</span>
        </div>
        <div v-if="stepIndex > 2" v-on:click="stepIndex--, error=false">
          <i class="fa fa-arrow-left"></i>
        </div>
      </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import TracksMap from './TracksMap.vue'

export default {
  name: 'Steps',
  data () {
    return {
      audioResponse: '',
      stepIndex: 0,
      error: false,
      errorMsg: '',
      errorNb: 0,
      win: false,
      indices: [],
      res: [],
      editable: true,
      isDragging: false,
      delayedDragging: false,
      puzzles2: [
        {image: 'img/louvre/Louvre-1.png', order: '1'},
        {image: 'img/louvre/Louvre-5.png', order: '5'},
        {image: 'img/louvre/Louvre-3.png', order: '3'},
        {image: 'img/louvre/Louvre-9.png', order: '9'},
        {image: 'img/louvre/Louvre-4.png', order: '4'},
        {image: 'img/louvre/Louvre-7.png', order: '7'},
        {image: 'img/louvre/Louvre-2.png', order: '2'},
        {image: 'img/louvre/Louvre-6.png', order: '6'},
        {image: 'img/louvre/Louvre-8.png', order: '8'}
      ],
      puzzles: [
      ],
      winMsg: [
        '',
        '',
        '',
        'Et oui, il s\'agit de Watteau, ses contemporains Boucher et Fragonnard sont plus intéressés par les scènes de divinité comme Diane sortant du bain pour Boucher ou des scènes familiales comme le lecteur pour Fragonnard. Voici ton 1er indice: ',
        'Voici ton nouvel indice: ',
        'Bravo, tu es fin prêt pour dénouer l\'énigme. Ton indice est: '
      ],
      indice: [
        '',
        '',
        '',
        'Antoine Watteau',
        'L\'indifférent',
        'Serge Bogoussiavsky'
      ],
      title: [
        'Bienvenue',
        'Etape 1',
        'Carte',
        'Etape 2',
        'Etape 3',
        'Etape 4',
        'Etape 5',
        'Etape 6',
        'Fin'
      ],
      shortDescription: [
        'Es-tu prêt à découvrir une des plus  grandes affaire de vol du musée du Louvre ?',
        '',
        '',
        '#Question à choix multiples',
        '#Puzzle',
        '#Action',
        '#Le dénouement',
        '#Le dénouement'
      ],
      description: [
        'Il te faudra faire preuve d\'ingéniosité et bien observer les lieux pour résoudre les énigmes et découvrir le fin mot de l\'histoire.',
        'Rendez-vous à l\'aile Sully, c\'est par là que notre voleur est entré le 19 juin 1939 afin d\'accomplir son crime.',
        '',
        'Nous sommes en plein coeur du style rococo, au milieu des années romantiques et des scènes idéalistes du 17e siecle. L\'artiste est passionné par les fêtes galantes, les costumes des dames et le théatre italien, en particulier la Commedia dell arte.',
        'Tu sais, le musée du Louvre n\'a pas toujours été ainsi. Essaie de replacer les pièces du puzzle dans le bon ordre :',
        'Dirige toi dans la salle suivante et écoute bien le message',
        'Es-tu en mesure de percer le mystère ? Sers toi des indeices pour compléter le message ci-dessous',
        'Es-tu en mesure de percer le mystère ? Sers toi des indeices pour compléter le message ci-dessous',
        'Le 19 juin 1939. Serge Bogoussiavsky alias Bog dérobait L\'indifférent d\'Antoine Watteau.'
      ],
      info: [
        'Si tu es d\'accord active la geoloc de ton smartphone et c\'est parti !',
        'Direction l\'aile Sully, 2ème étage, salle 36',
        '',
        'De qui s\'agit-il ?',
        '',
        '',
        'Le __ juin ____. _____ _____________ alias Bog dérobait ____________ d\'_______ _______.',
        '',
        'Deux mois plus tard, le voleur restitue l’Indifférent. Serge, en guise d’explications à son geste, argue avoir voulu enlever le goudron et restaurer les couleurs. Il confie même au magazine Time, le 21 août 1939 : « J’ai toujours aimé Watteau. Je ne pouvais pas supporter de le voir au Louvre dans un tel état. » Il fut condamné à 5 ans de prison.'
      ],
      classe: [
        'fa fa-arrow-right',
        'fa fa-map-o',
        'fa fa-arrow-right',
        'fa fa-arrow-right',
        'fa fa-arrow-right',
        'fa fa-arrow-right',
        'fa fa-arrow-right',
        '',
        ''
      ],
      stepAllow: [
        true
      ],
      painters: [
        {name: 'Antoine', surname: 'Watteau'},
        {name: 'François', surname: 'Boucher'},
        {name: 'Jean-Honoré', surname: 'Fragonnard'}
      ],
      checkedNames: []
    }
  },
  methods: {
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
      console.log(this.res)
      console.log(this.indices)
      console.log(this.indice)
      return this.res
    },
    playSound (sound) {
      if (sound) {
        var audio = new Audio(sound)
        audio.play()
      }
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
    suite: function () {
      if (this.stepIndex === 3) {
        if (this.checkedNames !== 'Watteau' && this.errorNb === 2) {
          /* Step 5 */
          this.error = true
          this.errorNb = 0
          this.errorMsg = 'Perdu. Passe à l\'étape suivante ! Le jeu continu, il y a encore plein d\'indices à découvrir '
        } else if (this.checkedNames !== 'Watteau' && this.errorNb === 1) {
          this.errorMsg = 'Non, ce n\'est pas ' + this.checkedNames + '. Attention, C\'est ta dernière chance !'
          this.stepIndex--
          this.error = true
          this.errorNb++
        } else if (this.checkedNames !== 'Watteau') {
          this.stepIndex--
          this.error = true
          this.errorNb++
          this.errorMsg = 'Non, ce n\'est pas ' + this.checkedNames + '. Retente ta chance !'
          /* Step 4+1 */
        } else {
          this.win = true
          this.stepIndex--
          this.error = false
        }
      }
      if (this.stepIndex === 4) {
        for (var i = 1; i < 9; i++) {
          if (this.puzzles2[i].order < this.puzzles2[i - 1].order) {
            this.error = true
            this.errorMsg = 'Non, essaie encore une fois'
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
      if (this.stepIndex === 5 && (this.audioResponse === 'Pierrot' || this.audioResponse === 'pierrot')) {
        this.win = true
        this.stepIndex--
        this.error = false
      } else if (this.stepIndex === 5 && this.errorNb < 3) {
        this.stepIndex--
        this.error = true
        this.errorNb++
        this.errorMsg = 'Petit indice supplémentaire, j\'adore les clairs de lune...'
      } else if (this.stepIndex === 5) {
        this.error = true
        this.errorNb++
        this.errorMsg = 'Non toujours pas.'
      }
      this.stepIndex = this.stepIndex + 1
    },
    orderList () {
      this.puzzles = this.puzzles.sort((one, two) => { return one.order - two.order })
    },
    onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 0,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost'
      }
    },
    watch: {
      isDragging (newValue) {
        if (newValue) {
          this.delayedDragging = true
          return
        }
        this.$nextTick(() => {
          this.delayedDragging = false
        })
      }
    }
  },
  components: {
    draggable,
    TracksMap
  },
  mounted: function () {
    console.log(this.indices)
    console.log(this.indice)
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
    font-size: 2rem;
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
  font-size: 2rem;
  background-color: #CEFF33;
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
  font-size: 3rem;
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
  font-weight: bold;
}

.radiobtn {
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    background-color: #eee;
    border-radius: 50%;
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
  font-size: 2rem;
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
