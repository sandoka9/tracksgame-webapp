<template>
  <div>
    <h3>  {{content.title}} </h3>
    <div class="description-bloc">
      <div class="short-description">{{content.shortDescription}}</div>
      <div class="description">{{content.stepDescription}}</div>
      <div class="info">{{content.info}}</div>
      <template><vue-qr-reader v-on:code-scanned="codeArrived"></template>
      <div>
        <input class="response form-control" type="text" name="response" v-bind:placeholder="content.info" v-model="response"/>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-qr-reader';
/* https://pulilab.github.io/vue-qr-reader/#/quickstart */

export default {
  name: 'TracksQcm',
  props: {
    content: {}
  },
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
    codeArrived (event) {
      console.log(event.detail[0])
    }
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
