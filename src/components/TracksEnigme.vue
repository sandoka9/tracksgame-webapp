<template>
  <div>
    <h3>  {{content.title}} </h3>
    <div class="description-bloc">
      <div class="short-description">{{content.shortDescription}}</div>
      <div class="description">{{content.stepDescription}}</div>
      <div class="info"  v-for="item in content.info" :key="item.indice" >
        {{item.text}}
        <!-- {{cluesFound[item.indice]}} -->
        <input type="text" class="input-solution" name="btn-item.indice" v-model="cluesFound[item.indice]" />
        <!-- <input type="text" class="input-solution" name="item.indice" v-if="typeof(cluesFound.key) !== 'undefined'"  v-model="cluesFound.key"  />
        <input type="text" class="input-solution" name="item.indice" v-else  /> -->
      </div>
      <div>
        <input class="response form-control" type="text" name="response" placeholder="Qui suis je ?" v-model="content.response" v-on:change="$emit('change', $event.target.value)"/>
      </div>
    <div> <!--  v-if="stepIndex == 6 || stepIndex == 7 " -->
    <button type="button" class="btn btn-light" v-on:click="$emit('moreIndex')" v-if="cluesKey !== null">Découvrir de nouveaux indices</button>
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
</style>
