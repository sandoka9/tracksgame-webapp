<template>
  <div class="content">
    <router-link :to="{ name: 'Home' }" class="content-back"><i class="fa fa-arrow-circle-left"></i> <span class="content-back-home">Home</span></router-link>
    <router-link :to="{ name: 'Home' }" class="content-start"> <span class="content-start-label">Start</span><i class="fa fa-arrow-circle-right"></i></router-link>
    <div class="details-content">
      <button class="details-content-play"><router-link :to="{ name: 'Steps', params: { gameId: 'rBnjvYj5K' } }"><i class="fa fa-play"></i></router-link></button>
      <a href=""><img src="/index/images_game.jpg" />
      <router-link :to="{ name: 'Steps', params: { gameId: 'rBnjvYj5K' } }"></router-link>
      </a>
      <span class="details-content-title"> title </span>
      <span class="details-content-description"> description </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Details Game',
  data () {
    return {
    }
  },
  methods: {
  }
}

</script>

<style scoped>

.content {
  background-color: black;
  height: 500vw;
  padding: -5vw;
}

.content-back {
  background-color: black;
  border: 0px;
  position: absolute;
  margin: 2vw;
  font-size: 8vw;
  color: white
}

.content-back-home {
  font-size: 5vw;
  vertical-align: super;
  margin-left: 2vw;
}

.content-start{
  background-color: black;
    border: 0px;
    margin: 2vw;
    margin-top: 100%;
    font-size: 8vw;
    color: white;
    position: relative;
    float: right;
}

.content-start-label {
  font-size: 5vw;
    vertical-align: super;
    margin-right: 2vw;
}
.details-content {
  padding: 5vw;
  width: 20vw;
  position:relative;
}

.details-content-play {
  position: absolute;
  opacity: .8;
  margin-left: 34vw;
  margin-top: 30vw;
  background-color: black;
  border: 0px;
  padding: 1vw;
}

.details-content-play i {
  color: #FBB50C;
  border: 0px;
  font-size: 10vw;
}

.details-content img {
  width: 80vw;
  margin-bottom: 10vw;
  border: 0.5vw solid white;
  margin-top: 10vw;
}

.details-content-title {
  font-weight: bold;
  color: #FBB50C;
}

.details-content-description {
  color: grey;
  font-size: 5vw;
}

</style>
