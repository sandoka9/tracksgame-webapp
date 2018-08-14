<template>
  <div class="content">
    <div class="content-title"></div>
    <div class="content-subtitle"></div>
    <div class="content-description">
      <!--https://codepen.io/korell/pen/bVbBgg?editors=101
    https://html5demo.pingfiles.fr/demo/wakeLockAPI.php  -->
      <span class="content-chrono" id="chrono"></span>
    </div>
    <div class="content-game"></div>
  </div>
</template>

<script>

export default {
  name: 'Info',
  props: ['content'],
  data () {
    return {
      msg: 'Bienvenue sur la map',
      ss: 0,
      mm: 0
    }
  },
  /* eslint-disable */
  mounted () {
    setInterval(this.chrono, 1000)
  },
  /* eslint-enable */
  methods: {
    chrono: function () {
  		if (this.ss > 59) {
  			this.mm++
  			this.ss = 0
  		}
  		document.getElementById('chrono').innerHTML = (this.mm < 10 ? "0" : "") + this.mm
  		                                      + ":" + (this.ss < 10 ? "0" : "") + this.ss
  		this.ss++
  		setTimeout('this.chrono()', 1000)
  	}
  }
}
</script>

<style scoped>

.content-chrono {
  font-size: 30vw;
  border: 1vw solid black;
  border-bottom: 2vw solid black;
  font-weight: bold;
  margin-left: 20vw;
  margin-top: 50vw;
  background-color: light-grey;
}

</style>
