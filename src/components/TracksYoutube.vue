<template>
  <div class="content">
    <div class="content-title">  {{content.title}} </div>
    <div class="content-subtitle">{{content.shortDescription}}</div>
    <div class="content-description">{{content.stepDescription}}</div>
    <div class="content-info">{{content.info}}</div>
    <div class="content-game">
    <!--  <VueYoutube video-id="BBJa32lCaaY"></VueYoutube> -->
    <VueYoutubePlayer :youtube="videoUrl" :style="{width: '50%'}"></VueYoutubePlayer>
      <div class="content-response">
        <input class="response form-control" type="text" name="response" placeholder="Qui suis je ?" v-model="content.response" v-on:change="$emit('change', $event.target.value)"/>
      </div>
    </div>
  </div>
</template>

<script>
import VueYoutubePlayer from 'vue-youtube-player'
export default {
  name: 'TracksYouTube',
  props: {
    content: {}
  },
  data () {
    return {
      videoUrl: 'https://www.youtube.com/watch?v=vpu17FEa6xw'
    }
  },
  components: {
    VueYoutubePlayer
  },
  computed: {
  },
  methods: {
  },
  created () {
  },
  watch: {
  },
  model: {
    event: 'change'
  }
}
</script>

<style scoped>
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
button {
  margin-top: 6em;
  margin-left: 10em;
}
.content-game{
}
.content-response{
  margin-top: 10%;
}
.form-control-sm {
  max-height: 0.5vh;
  max-width: 100%;
}
.form-control {
  max-width: 50vh;
  margin-left: 8vh;
}
.response {
  margin-right: 5vh;
  max-width: 35vh;
  font-size: 1rem;
}
</style>