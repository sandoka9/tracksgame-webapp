<template>
  <div class="content">
    <div class="content-title">  {{content.title}} </div>
    <div class="content-subtitle">{{content.shortDescription}}</div>
    <div class="content-description">{{content.stepDescription}}</div>
    <div class="content-game">
      {{content.info}}
      <!--<ul id="v-for-object" class="content-game-ul">
        <li v-for="item in content.qcm" :key="item.name" >
          <label v-bind:for="item.surname">
            <input class="content-game-radiobtn" type="radio" name="qcm" v-bind:value="item.surname" v-on:change="$emit('change', $event.target.value)" />
            {{ item.name }} {{ item.surname }}
            <span ></span>
          </label>
      -->
        <div v-for="item in content.qcm" :key="item.name" >
          <label class="content-game-checkcontainer">{{ item.name }} {{ item.surname }}
            <input class="content-game-radiobtn" type="radio" name="qcm" v-bind:value="item.surname" v-on:change="$emit('change', $event.target.value)" />
            <span class="radiobtn"></span>
          </label>
        </div>
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

<style scoped>

.content-game{
  width: 55%;
}

.content-game-checkcontainer{
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 17px;
  -webkit-user-select: none;
}

.content-game-checkcontainer input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

.content-game-radiobtn{

}

.content-game-radiobtn {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}
</style>
