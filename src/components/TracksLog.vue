<template>
  <div class="content">
    <button type="content-button" class="content-button form-control" v-on:click="change()">
            Log
    </button>
    <div class="content-log" v-bind:class="{ active: isActive }" v-on:click="change()"> <!--v-bind:class="{disabled:isActive}" -->
      {{logMess}}
    </div>
  </div>
</template>

<script>

export default {
  name: 'TracksLog',
  props: [],
  data () {
    return {
      logMess: '',
      isActive: false
    }
  },
  /* eslint-disable */
  created () {
    this.showLog()
  },
  /* eslint-enable */
  methods: {
    change: function () {
      this.isActive = !this.isActive
      this.showLog()
    },
    showLog: function () {
      this.logMess = window.tgLogger.show()
      setInterval(this.showLog, 100000)
    }
  }
}

</script>

<style scoped>

.content-button{
  float: left;
  top: 70%;
  position:absolute;
}

.content-log{
  background-color: white;
  color: white;
  z-index: -1;
}

.active{
  z-index: 999;
  background-color: black; /* Yellow violet #93329E*/
  color: grey;
  font-size: 2vw;
  font-family: courier, serif;
  min-height: 15%;
  width: 100%;
  float: left;
  padding: 5%;
  top: 55%;
  position: absolute;
  opacity: 0.9;
}

</style>
