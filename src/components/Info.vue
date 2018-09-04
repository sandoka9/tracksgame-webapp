<template>
  <div class="content">
    <div class="content-title"></div>
    <div class="content-subtitle"></div>
    <div class="content-description">
      <!--https://codepen.io/korell/pen/bVbBgg?editors=101
    https://html5demo.pingfiles.fr/demo/wakeLockAPI.php  -->
      <span class="content-chrono" id="chrono"></span>
      <span> Début : </span><span>{{startDate}}</span>
      <span> Etapes réussies: </span><span v-for="item in cluesFound" :key="item">{{item}}</span>
      <span> Etapes à faire: </span><span v-for="item in clues" :key="item">{{item}}</span>
      <span> Indices obtenus </span><span></span>
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
      cluesFound: '',
      clues: ''
    }
  },
  /* eslint-disable */
  created () {
    this.startDate = localStorage.startDate
    this.cluesFound = JSON.parse(localStorage.cluesFound)
    this.clues = JSON.parse(localStorage.clues)

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

</style>
