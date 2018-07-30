<template>
  <div class="content">
    <div class="content-title">  {{content.title}} </div>
    <div class="content-subtitle">{{content.shortDescription}}</div>
    <div class="content-description">{{content.stepDescription}}</div>
    <div class="content-info">{{content.info}}</div>
    <div class="content-game">
      <label >
        <button class="content-game-audio" @click.prevent="playSound(content.src)">
          <!-- http://soundbible.com/mp3/Elevator Ding-SoundBible.com-685385892.mp3 -->
          <i class="fa fa-play"></i>
        </button>
        <span>Play</span>
      </label>
    </div>
    <div class="content-response">
      <input class="response form-control" type="text" name="response" placeholder="Qui suis je ?" v-model="content.response" v-on:change="$emit('change', $event.target.value)"/>
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
    playSound (sound) {
      if (sound) {
        var audio = new Audio(sound)
        audio.play()
      }
    }
  },
  model: {
    event: 'change'
  }
}
</script>

<style scoped>

.audio {
  margin-top: 10vh;
}

.content-game{
  width: 100%;
  margin-top:10%;
}

.content-game span{
  vertical-align: super;
}

.content-game button{
  color: white;
  background-color: white;
  border: 0px
}

.content-game button:active{
  color: white;
  background-color: white;
  border: 0px
}

.content-game button:focus{
  display:none;
}

.content-game-audio i{
  color: #FBB50C; /* Orange */
  font-size: 20vw;
}
.content-game-audio i:active{
  color: grey;
}
.content-game-audio i:focus{
  color: grey;
}

.form-control-sm {
  max-height: 0.5vh;
  max-width: 100%;
}

.form-control {
  max-width: 50vh;
  margin-top: 10vh;
  margin-left: 8vh;
}

.response {
  margin-right: 5vh;
  max-width: 35vh;
  font-size: 1rem;
}

</style>
