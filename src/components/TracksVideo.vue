<template>
  <div class="content">
    <div class="content-title">  {{content.title}} </div>
    <div class="content-subtitle">{{content.shortDescription}}</div>
    <div class="content-description">{{content.stepDescription}}</div>
    <div class="content-info">{{content.info}}</div>
    <div class="content-game">
      <videoPlayer class="video-player-box"
               ref="videoPlayer"
               :options="playerOptions"
               :playsinline="true"
               customEventName="customstatechangedeventname"
               @play="onPlayerPlay($event)"
               @pause="onPlayerPause($event)"
               @ended="onPlayerEnded($event)"
               @waiting="onPlayerWaiting($event)"
               @playing="onPlayerPlaying($event)"
               @loadeddata="onPlayerLoadeddata($event)"
               @timeupdate="onPlayerTimeupdate($event)"
               @canplay="onPlayerCanplay($event)"
               @canplaythrough="onPlayerCanplaythrough($event)"
               @statechanged="playerStateChanged($event)"
               @ready="playerReadied">
      </videoPlayer>
      <div class="content-response">
        <input class="response form-control" type="text" name="response" placeholder="Qui suis je ?" v-model="content.response" v-on:change="$emit('change', $event.target.value)"/>
      </div>
    </div>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

export default {
  name: 'TracksQcm',
  props: {
    content: {}
  },
  data () {
    return {
      msg: 'Bienvenue sur la map',
      playerOptions: {
        // videojs options
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: this.content.src
        }],
        poster: this.content.poster
      }
    }
  },
  components: {
    videoPlayer
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    // listen event
    onPlayerPlay (player) {
      // console.log('player play!', player)
    },
    onPlayerPause (player) {
      // console.log('player pause!', player)
    },
    // ...player event
    // or listen state event
    playerStateChanged (playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },
    // player is ready
    playerReadied (player) {
      // you can use it to do something...
      // player.[methods]
    },
    onPlayerEnded (player) {
    },
    onPlayerWaiting (player) {
    },
    onPlayerPlaying (player) {
    },
    onPlayerLoadeddata (player) {
    },
    onPlayerTimeupdate (player) {
    },
    onPlayerCanplay (player) {
    },
    onPlayerCanplaythrough (player) {
    }
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

.video-js{
  width: 80%;
  height: 200px;
}

.video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
}

.fullscreen{
  width: 90%;
  height: 90%;
  video{
    position: absolute;
    width: 90%;
    height: 90%;
    top: 0;
    left: 0;
  }
}

.popover{
  width: 90%;
  background-color: rgba(black, 0.4);
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 0;
  margin: 0;
  z-index: 100;
  display: flex;
  box-shadow: 0 2px 10px rgba(black, .3);
  li{
    display: inline-block;
    height: 100%;
    flex: 1 0 16%;
    img{
      display: block;
      max-width: 100%;
      height: auto;
    }
  }
}

.loader{
  position: absolute;
  background-color: rgba(black, 0.6);
  z-index: 200;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &__inner{
    background: yellow;
    width: 0%;
    height: 1%;
    margin: 45% 0 0;
    &--active{
      width: 100%;
      transition: width 1s;
    }
  }
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
