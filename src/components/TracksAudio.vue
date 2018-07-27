<template>
  <div class="content">
    <div class="content-title">  {{content.title}} </div>
    <div class="content-subtitle">{{content.shortDescription}}</div>
    <div class="content-description">{{content.stepDescription}}</div>
    <div class="content-game">
      {{content.info}}
      <label>
        <button class="content-game-audio" @click.prevent="playSound('img/louvre/recording-20180701-171430.mp3')">
          <!-- http://soundbible.com/mp3/Elevator Ding-SoundBible.com-685385892.mp3 -->
          <i class="fa fa-play-circle-o"></i>
        </button>
        Play
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
  margin-left: 20vh;
}

.fa.fa-play-circle-o {
    font-size: 3rem;
}

.form-control-sm {
  max-height: 0.5vh;
  max-width: 5vh;
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
