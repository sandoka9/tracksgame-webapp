<template>
  <div>
    <h3>  {{content.title}} </h3>
    <div class="description-bloc">
      <div class="short-description">{{content.shortDescription}}</div>
      <div class="description">{{content.stepDescription}}</div>
      <div class="info">{{content.info}}</div>
        <label>
          <button class="audio" @click.prevent="playSound('img/louvre/recording-20180701-171430.mp3')">
            <!-- http://soundbible.com/mp3/Elevator Ding-SoundBible.com-685385892.mp3 -->
            <i class="fa fa-play-circle-o"></i>
          </button>
          Play
        </label>
        <div>
          <input class="response form-control" type="text" name="response" placeholder="Qui suis je ?" v-model="content.response" v-on:change="$emit('change', $event.target.value)"/>
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
    font-size: 6rem;
}

</style>
