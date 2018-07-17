<template>
  <div>
    <h3>  {{content.title}} </h3>
    <div class="description-bloc">
      <div class="short-description">{{content.shortDescription}}</div>
      <div class="description">{{content.stepDescription}}</div>
      <div class="info"  v-for="item in content.info" :key="item.indice" >
        {{item.text}}
        cluesFound["1"] {{cluesFound["1"]}}
        key {{key}}
        <!-- {{cluesFound[item.indice]}} -->
        <!-- <input type="text" class="input-solution" name="item.indice" v-model="item.indice" /> -->
        <!-- <input type="text" class="input-solution" name="item.indice" v-if="typeof(cluesFound.key) !== 'undefined'"  v-model="cluesFound.key"  />
        <input type="text" class="input-solution" name="item.indice" v-else  /> -->
      </div>
      <button type="button" class="btn btn-light" v-on:click="showclues = true">Resultat</button>
    <div> <!--  v-if="stepIndex == 6 || stepIndex == 7 " -->
      <button type="button" class="btn btn-light" v-if="showclues == false" v-on:click="showclues = true">Afficher les indices</button>
    </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TracksIntro',
  props: {
    content: Object,
    cluesFound: Object
  },
  data () {
    return {
      msg: 'Bienvenue sur la map',
      showclues: false
    }
  },
  /* eslint-disable */
  mounted () {
  },
  /* eslint-enable */
  methods: {
    afficherIndice () {
      console.log(this.clues)
      var index = 0
      this.stepIndex++
      var lg = this.clues.length
      for (var i = 0; i < lg; i++) {
        if (this.clues[i] !== '') {
          index = Number(this.clues[i])
          this.res[index] = this.indice[index]
        }
      }
      return this.res
    }
  }
}
</script>

<style>

.radiobtn {
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    background-color: #eee;
    border-radius: 50%;
}
</style>
