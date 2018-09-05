<template>
  <div class="content">
    <div class="content-title"></div>
    <div class="content-subtitle"></div>
    <div class="content-description">
      <!--https://codepen.io/korell/pen/bVbBgg?editors=101
    https://html5demo.pingfiles.fr/demo/wakeLockAPI.php  -->
      <!-- <span class="content-chrono" id="chrono"></span> -->
      <span> Début : </span><span class="content-description-info">{{startDate}}</span>
      <span> Etapes réussies: </span><span class="content-description-info"> {{stepDoneNb}}/{{stepIndexMax}} </span>
      <span> Indices obtenus </span><span class="content-description-info" v-for="item in cluesFound" :key="item" v-if="enigmaType === 'map'"><img :src="item" /></span>
    </div>
    <div class="content-game"></div>
  </div>
</template>

<script>

export default {
  name: 'Info',
  props: {},
  data () {
    return {
      msg: 'Bienvenue sur la map',
      ss: 0,
      mm: 0,
      startDate: '',
      stepDone: '',
      stepTotal: '',
      cluesFound: '',
      enigmaType: ''
    }
  },
  /* eslint-disable */
  created () {
    this.startDate = localStorage.startDate
    this.stepDoneNb = localStorage.stepDoneNb
    this.stepTotal = localStorage.stepTotal
    this.stepIndexMax = localStorage.stepIndexMax
    this.cluesFound = JSON.parse(localStorage.cluesFound)
    this.enigmaType = localStorage.enigmaType

  },
  mounted () {
    document.getElementById('chrono').innerHTML = ''
    // this.chrono()
  },
  /* eslint-enable */
  methods: {
    chrono: function () {
      if (this.ss > 59) {
        this.mm++
        this.ss = 0
      }
      document.getElementById('chrono').innerHTML = (this.mm < 10 ? '0' : '') + this.mm + ':' + (this.ss < 10 ? '0' : '') + this.ss
      this.ss++
      setTimeout(this.chrono, 1000)
    }
  }
}

</script>

<style scoped>

.content-chrono {
  font-size: 20vw;
  border: 1vw solid black;
  border-bottom: 2vw solid black;
  font-weight: bold;
  margin-left: 15vw;
  margin-top: 50vw;
  background-color: light-grey;
}

.content-description {
  width: 70vw;
}

.content-description span {
  width: 35vw;
  margin-right: 5vw;
  margin-left: 10vw;
}

.content-description img {
  width: 15vw;
  float: right;
}

.content-description-info {

}
</style>
