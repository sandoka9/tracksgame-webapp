<template>
  <div>
    <h3>  {{content.title}} </h3>
    <div class="description-bloc">
      <div class="short-description">{{content.shortDescription}}</div>
      <div class="description">{{content.stepDescription}}</div>
      <div class="info">{{content.info}}</div>
      <div class="fullscreen">
      	<video v-el:video controls
      				 :poster="current.thumb"
      				 @ended.prevent="switchToNext"
      				 @mousemove="showThumbs">
          <source v-for='(type, src) in current.video'
      						:src="src" :type="type">
      		HTML5 Video seems to be not supported in your browser.
      	</video>
      </div>
      <ul class="popover"
      		v-show="showThumbnails">
      	<li v-for='video in videos'
      			v-show='$index !== currentIndex'>
      		<a :href="firstSource(video.video)"
      			 @click.prevent="setCurrent($index)">
      			<img :src="video.thumb" alt="" />
      		</a>
      	</li>
      </ul>
      <div v-show='loader'>
      	<div class="loader">
      		<div class="loader__inner"
      				 :class="{'loader__inner--active': loader}">
          </div>
        </div>
      </div>
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
      msg: 'Bienvenue sur la map',
      videos: [
        {
          thumb: 'http://www.supportduweb.com/page/media/videoTag/BigBuckBunny.png',
          video: {
            'video/mp4': 'http://www.supportduweb.com/page/media/videoTag/BigBuckBunny.mp4',
            'video/webm': 'http://www.supportduweb.com/page/media/videoTag/BigBuckBunny.webm',
            'video/ogg': 'http://www.supportduweb.com/page/media/videoTag/BigBuckBunny.webm'
          }
        }
      ],
      currentIndex: 0,
      timeout: null,
      showThumbnails: false,
      forceShow: false,
      loader: false
    }
  },
  computed: {
    current: function () {
      return this.videos[this.currentIndex]
    }
  },
  methods: {
    firstSource: function (obj) {
      return obj['video/mp4']
    },
    setCurrent: function (index) {
      this.currentIndex = index
    },
    switchToNext: function () {
      this.currentIndex++
      if (this.currentIndex === this.videos.length) {
        this.currentIndex = 0
      }
    },
    showThumbs: function () {
      this.showThumbnails = true
      this.hideThumbs()
    },
    hideThumbs: function () { /* debounce( */
      this.showThumbnails = false
    } /* , 1000) */
  },
  watch: {
    current: function (newVal, oldVal) {
      this.$els.video.load()
      this.loader = true
      setTimeout(function () {
        this.$els.video.play()
        this.loader = false
      }.bind(this), 1000)
    }
  },
  ready: function () {
    this.$els.video.play()
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

.fullscreen{
  width: 100%;
  height: 100%;
  video{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}

.popover{
  width: 100%;
  background-color: rgba(black, 0.4);
  position: absolute;
  top: 0;
  left: 0;
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

</style>
