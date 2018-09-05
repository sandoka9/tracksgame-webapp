<template>
  <div class="home-content">
    <div class="content-game">
      <router-link :to="{ name: 'DetailsGame', params: { gameId: 'rBnjvYj5K' } }"><img src="/index/images_game_rBnjvYj5K.jpg" /></router-link>
      <span class="content-game-title"> title </span>
      <router-link :to="{ name: 'DetailsGame', params: { gameId: 'sCmkwZ6L' } }"><img src="/index/images_game_sCmkwZ6L.jpg" /></router-link>
      <span class="content-game-title"> title </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
    }
  },
  created () {
    localStorage.clear()
    localStorage.stepIndex = ''
    localStorage.tgId = ''
    localStorage.cluesFound = ''
    localStorage.json = ''
    localStorage.gmap = ''
    localStorage.marker = ''
  }
}

</script>

<style scoped>

.home-content {
  background-color: black;
  height: 500vw;
}

.content-game {
  width:60vw;
  padding: 4vw;
}

.content-game img {
  width: 50vw;
  border: 0.5vw solid white;
}

.content-game-title {
  color: grey;
  font-weight: bold;
  color: #FBB50C;
}

</style>
