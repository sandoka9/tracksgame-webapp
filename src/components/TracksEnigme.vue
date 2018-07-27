<template>
  <div class="content">
    <div class="content-title">  {{content.title}} </div>
    <div class="content-subtitle">{{content.shortDescription}}</div>
    <div class="content-description">{{content.stepDescription}}</div>
    <div class="content-game"  v-for="item in content.info" :key="item.indice" >
      {{item.text}}
      <!-- {{cluesFound[item.indice]}} -->
      <input type="text" class="input-solution" name="btn-item.indice" v-model="cluesFound[item.indice]" />
      <!-- <input type="text" class="input-solution" name="item.indice" v-if="typeof(cluesFound.key) !== 'undefined'"  v-model="cluesFound.key"  />
      <input type="text" class="input-solution" name="item.indice" v-else  /> -->
    </div>
    <div class="content-response"> <!--  v-if="stepIndex == 6 || stepIndex == 7 " -->
      <button type="button" class="btn btn-light" v-on:click="$emit('moreIndex')" v-if="cluesKey !== '' && stepIndexEnd == false">{{cluesKey}} + Découvrir de nouveaux indices</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TracksIntro',
  props: {
    content: Object,
    cluesFound: Object,
    cluesKey: String,
    stepIndexEnd: Boolean
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
  },
  model: {
    event: 'change'
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

input.input-solution {
    border: none;
    font-size: 1rem;
    background: #e9fcab;
}

</style>
