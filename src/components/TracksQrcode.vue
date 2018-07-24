<template>
  <div>
    <h3>  {{content.title}} </h3>
    <div class="description-bloc">
      <div class="short-description">{{content.shortDescription}}</div>
      <div class="description">{{content.stepDescription}}</div>
      <div class="info">{{content.info}}</div>
      <!-- <QrcodeReader @decode="onDecode" @init="onInit">
        <div class="decoded-content">{{ contentCode }}</div>
        <LoadingIndicator v-show="loading" />
      </QrcodeReader> -->
      <div>
        <input class="response form-control" type="text" name="response" placeholder="content.info" v-model="content.response" v-on:change="$emit('change', $event.target.value)"/>
      </div>
    </div>
      Hello
  </div>
</template>

<script>
/* import 'vue-qrcode-reader/dist/vue-qrcode-reader.css'
/* import { QrcodeReader } from 'vue-qrcode-reader' */
/* import InitHandler from '@/mixins/InitHandler' */

export default {
  name: 'TracksQcm',
  props: {
    content: {}
  },
  /* mixins: [ InitHandler ], */
  data () {
    return {
      msg: 'Bienvenue sur la map',
      contentCode: ''
    }
  },
  /* eslint-disable */
  mounted () {
  },
  /* eslint-enable */
  methods: {
    codeArrived (event) {
      console.log(event.detail[0])
    },
    onDecode (contentCode) {
      this.contentCode = contentCode
    },
    async onInit (promise) {
    // show loading indicator

      try {
        await promise

        // successfully initialized
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          // user denied camera access permisson
        } else if (error.name === 'NotFoundError') {
          // no suitable camera device installed
        } else if (error.name === 'NotSupportedError') {
          // page is not served over HTTPS (or localhost)
        } else if (error.name === 'NotReadableError') {
          // maybe camera is already in use
        } else if (error.name === 'OverconstrainedError') {
          // passed constraints don't match any camera. Did you requested the front camera although there is none?
        } else {
          // browser is probably lacking features (WebRTC, Canvas)
        }
      } finally {
        // hide loading indicator
      }
    }
  },
  model: {
    event: 'change'
  },
  components: {
    /* QrcodeReader */
  }
}
</script>

<style>

.decoded-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 100%;
  padding: 0px 20px;
  color: #fff;
  font-weight: bold;
  padding: 10px;
  background-color: rgba(0,0,0,.5);
}

.radiobtn {
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    background-color: #eee;
    border-radius: 50%;
}
</style>
