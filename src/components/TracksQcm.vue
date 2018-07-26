<template>
  <div>
    <h3>  {{content.title}} </h3>
    <div class="description-bloc">
      <div class="short-description">{{content.shortDescription}}</div>
      <div class="description">{{content.stepDescription}}</div>
      <div class="info">{{content.info}}</div>
      <ul id="v-for-object" class="list-unstyled">
        <li v-for="item in content.qcm" :key="item.name" >
          <label v-bind:for="item.surname">
            <input class="radiobtn" type="radio" name="painter" v-bind:value="item.surname" v-on:change="$emit('change', $event.target.value)" />
            {{ item.name }} {{ item.surname }}
            <span ></span>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

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
    width: 10px;
    height: 10px;
    background-color: #eee;
    border-radius: 50%;
    size: 1rem;
}
</style>
