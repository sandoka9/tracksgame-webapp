/* eslint-disable */
<template>
  <div id="steps">
     <h2>{{title[stepIndex]}}</h2>
    <div class="description-bloc">
      <div class="short-description">{{shortDescription[stepIndex]}}</div>
      <div class="description">{{description[stepIndex]}}</div>
      <div class="info" v-if="stepIndex == 0 || stepIndex == 1">{{info [stepIndex]}}</div>
      <div class="qcm" v-if="stepIndex == 3">
        <ul class="list-unstyled">
          <li>
            <input type="checkbox" name="watteau" value="Watteau" />
            <label for="watteau">Antoine Watteau</label>
          </li>
          <li>
            <input type="checkbox" name="boucher" value="Boucher" />
            <label for="boucher">François Boucher</label>
          </li>
          <li>
            <input type="checkbox" name="fragonnard" value="Fragonnard" />
            <label for="fragonnard">Jean-Honoré Fragonnard</label>
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
      stepIndex: 0,
      title: [
        'Bienvenue',
        'Etape 1',
        'Carte',
        'Etape 2'
      ],
      shortDescription: [
        'Es-tu prêt à découvrir une des plus  grandes affaire de vol du musée du Louvre ?',
        '',
        '',
        '#Question à choix multiples'
      ],
      description: [
        'Il te faudra faire preuve d\'ingéniosité et bien observer les lieux pour résoudre les énigmes et découvrir le fin mot de l\'histoire.',
        'Rendez-vous à l\'aile Sully, c\'est par là que notre voleur est entré le 19 juin 1939 afin d\'accomplir son crime.',
        '',
        'Nous sommes en plein coeur du style rococo, au milieu des années romantiques et des scènes idéalistes du 17e siecle. L\'artiste est passionné par les fêtes galantes, les costumes des dames et le théatre italien, en particulier la Commedia dell arte.'
      ],
      info: [
        'Si tu es d\'accord active la geoloc de ton smartphone et c\'est parti !',
        'Direction l\'aile Sully, 2ème étage, salle 36',
        '',
        'De qui s\'agit-il ?'
      ],
      classe: [
        'fa fa-arrow-right',
        'fa fa-map-o',
        'fa fa-arrow-right'
      ],
      stepAllow: [
        true
      ]
    }
  },
  methods: {
    suite: function () {
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
.description-bloc {
  font-size: 1.5rem;
  background-color: #CEFF33;
  min-height: 70vh;
  padding-top: 5vh;
  padding-left: 1vh;
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
</style>
