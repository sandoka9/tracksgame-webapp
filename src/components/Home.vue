<template>
  <div class="home-content">
    <div class="content-game">
      <router-link :to="{ name: 'DetailsGame'}"><img src="/index/images_game.jpg" /></router-link>
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
