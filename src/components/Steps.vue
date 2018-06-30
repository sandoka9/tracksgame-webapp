/* eslint-disable */
<template>
  <div id="steps">
    <h1>{{stepIndex}}</h1>
     <h2>{{title[stepIndex]}}</h2>
    <div class="description-bloc">
      <div class="short-description">{{shortDescription[stepIndex]}}</div>
      <div class="description">{{description[stepIndex]}}</div>
      <div class="error-msg" v-if="error == true" v-on:click="close">
        {{errorMsg}}
        <div class="indice">Close</div>

      </div>
      <div class="win-msg" v-if="win == true"  v-on:click="close">
        {{winMsg[stepIndex]}}
        <div class="indice">{{indice[stepIndex]}}</div>
      </div>
      <div class="info" v-if="stepIndex == 0 || stepIndex == 1">{{info [stepIndex]}}</div>
      <div class="puzzle" v-if="stepIndex == 4">
        <table class="table table-bordered">
          <tbody>
            <tr><td> 1 </td><td> 2 </td><td> 3</td></tr>
            <tr><td> 4 </td><td> 5 </td><td> 6 </td></tr>
            <tr><td> 7 </td><td> 8 </td><td> 9 </td></tr>
          </tbody>
        </table>
        <!--
        <span class="randomImg" v-for="item in puzzles" :key="item.id">
          <img :src="item.img" :id="item.id" />
        </span>
      -->
        <img src="../assets/louvre/Louvre-1.png" id="1" class="image" />
        <img src="../assets/louvre/Louvre-2.png" id="2" class="image" />
        <img src="../assets/louvre/Louvre-3.png" id="3" class="image" />
        <img src="../assets/louvre/Louvre-4.png" id="4" class="image" />
        <img src="../assets/louvre/Louvre-5.png" id="5" class="image" />
        <img src="../assets/louvre/Louvre-6.png" id="6" class="image" />
        <img src="../assets/louvre/Louvre-7.png" id="7" class="image" />
        <img src="../assets/louvre/Louvre-8.png" id="8" class="image" />
        <img src="../assets/louvre/Louvre-9.png" id="9" class="image" />
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
      <div :class=classe[stepIndex] v-on:click="suite">
        <span class="suite-text" v-if="stepIndex == 1">Visualiser la carte</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Steps',
  data () {
    return {
      image: 'src/assets/louvre/Louvre-7.png',
      stepIndex: 0,
      error: false,
      errorMsg: '',
      errorNb: 0,
      win: false,
      indices: [],
      winMsg: [
        '',
        '',
        '',
        'Et oui, il s\'agit de Watteau, ses contemporains Boucher et Fragonnard sont plus intéressés par les scènes de divinité comme Diane sortant du bain pour Boucher ou des scènes familiales comme le lecteur pour Fragonnard. Voici ton 1er indice: '
      ],
      indice: [
        '',
        '',
        '',
        'Antoine Watteau'
      ],
      title: [
        'Bienvenue',
        'Etape 1',
        'Carte',
        'Etape 2',
        'Etape 3'
      ],
      shortDescription: [
        'Es-tu prêt à découvrir une des plus  grandes affaire de vol du musée du Louvre ?',
        '',
        '',
        '#Question à choix multiples',
        '#Puzzle'
      ],
      description: [
        'Il te faudra faire preuve d\'ingéniosité et bien observer les lieux pour résoudre les énigmes et découvrir le fin mot de l\'histoire.',
        'Rendez-vous à l\'aile Sully, c\'est par là que notre voleur est entré le 19 juin 1939 afin d\'accomplir son crime.',
        '',
        'Nous sommes en plein coeur du style rococo, au milieu des années romantiques et des scènes idéalistes du 17e siecle. L\'artiste est passionné par les fêtes galantes, les costumes des dames et le théatre italien, en particulier la Commedia dell arte.',
        'Tu sais, le musée du Louvre n\'a pas toujours été ainsi. Essaie de replacer les pièces du puzzle dans le bon ordre :'
      ],
      info: [
        'Si tu es d\'accord active la geoloc de ton smartphone et c\'est parti !',
        'Direction l\'aile Sully, 2ème étage, salle 36',
        '',
        'De qui s\'agit-il ?',
        ''
      ],
      classe: [
        'fa fa-arrow-right',
        'fa fa-map-o',
        'fa fa-arrow-right',
        'fa fa-arrow-right'
      ],
      stepAllow: [
        true
      ],
      painters: [
        {name: 'Antoine', surname: 'Watteau'},
        {name: 'François', surname: 'Boucher'},
        {name: 'Jean-Honoré', surname: 'Fragonnard'}
      ],
      checkedNames: [],
      puzzles: [
        {img: '../assets/louvre/Louvre-1.png', id: 1},
        {img: '../assets/louvre/Louvre-2.png', id: 2},
        {img: '../assets/louvre/Louvre-3.png', id: 3},
        {img: '../assets/louvre/Louvre-4.png', id: 4},
        {img: '../assets/louvre/Louvre-5.png', id: 5},
        {img: '../assets/louvre/Louvre-6.png', id: 6},
        {img: '../assets/louvre/Louvre-7.png', id: 7},
        {img: '../assets/louvre/Louvre-8.png', id: 8},
        {img: '../assets/louvre/Louvre-9.png', id: 9}
      ]
    }
  },
  methods: {
    close: function () {
      if (this.error === true) {
        this.error = false
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
          this.stepIndex--
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
      this.stepIndex = this.stepIndex + 1
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
    font-family: fantasy;
    margin-top: 1vh;
}
.short-description .description {
  margin-top: 30vh;
}
.error-msg, .win-msg {
  min-height: 40vh;
  min-width: 67px;
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
.win-msg{
  background-color: #206040;
  color: white;
  padding-right: 5vh;
  padding-top: 5vh;
}
/*
.relative {
    position: relative;
    height: 80px;
    background-color: #cfc;
    border-color: #696;
    opacity: 0.7;
}
*/
.indice {
  margin-top: 5vh;
  background-color: #ccc7c7;
  color: red;
  text-align: center;
}
.description-bloc {
  font-size: 1.5rem;
  background-color: #CEFF33;
  min-height: 70vh;
  padding-top: 5vh;
  padding-left: 1vh;
}
.list-unstyled {
  padding-left: 20vh;
  padding-top: 1vh;
}
.table {
  min-height: 35vh;
  color: #6d6c6c;
  text-align: center;
  border: 1px solid black;
}
.image {
  width: 12vh;
  height: 10vh;
  margin: 0.25vh;
}
.fa {
  font-size: 3rem;
  float: right;
  margin-top: 7vh;
  padding-right:1vh;
}
.suite-text {
  font-size: 1.5rem;
  font-weight: bold;
  padding-left: 3vh;
  padding-right: 7vh;
}
.info {
  margin-top:5vh;
}
.radiobtn {
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 50%;
}
</style>
