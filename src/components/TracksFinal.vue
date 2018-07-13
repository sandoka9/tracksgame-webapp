<template>
  <div>
    <h3>  {{content.title}} </h3>
    <div class="description-bloc">
      <div class="short-description">{{content.shortDescription}}</div>
      <div class="description">{{content.stepDescription}}</div>
      <div class="info">
      Le
      <input type="text" class="input-solution" name="jour" value="" /> juin
      <input type="text" class="input-solution" name="annee" value="" />.
      <input type="text" class="input-solution" name="voleur" v-model="res[5]" placeholder="" />
      alias Bog dérobait
      <input type="text" class="input-solution" name="voleur" v-model="res[4]" placeholder="" />
      <input type="text" class="input-solution" name="voleur" v-model="res[3]" placeholder="" />
      <button type="button" class="btn btn-light" v-on:click="stepIndex = stepIndex + 1">Resultat</button>
    </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TracksIntro',
  props: ['content'],
  data () {
    return {
      msg: 'Bienvenue sur la map'
    }
  },
  /* eslint-disable */
  mounted () {
  },
  /* eslint-enable */
  methods: {
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
