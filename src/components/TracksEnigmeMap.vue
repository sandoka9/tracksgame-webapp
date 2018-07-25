<template>
  <div>
    <h3>  {{content.title}} </h3>
    <div class="description-bloc">
      <div class="short-description">{{content.shortDescription}}</div>
      <div class="description">{{content.stepDescription}}</div>
      <div class="info"  v-for="item in content.info" :key="item.indice" >
        {{item.text}}
        <!-- {{cluesFound[item.indice]}} -->
        <input type="text" class="input-solution" name="btn-item.indice" v-model="cluesFound[item.indice]" />
        <!-- <input type="text" class="input-solution" name="item.indice" v-if="typeof(cluesFound.key) !== 'undefined'"  v-model="cluesFound.key"  />
        <input type="text" class="input-solution" name="item.indice" v-else  /> -->
      </div>
      <div class="enigmeMap">
        <ul>
          <li class="randomImg" v-for="element in cluesFound" :key="element.indice" >
            <img :src="element.indice" />
          </li>
        </ul>
      </div>
    </div>
    <div> <!--  v-if="stepIndex == 6 || stepIndex == 7 " -->
      <button type="button" class="btn btn-light" v-on:click="$emit('moreIndex')" v-if="cluesKey !== ''">{{cluesKey}} + Découvrir de nouveaux indices</button>
    </div>
    <div id="gmap"></div>
  </div>
</template>

<script>

export default {
  name: 'TracksIntro',
  props: {
    content: Object,
    cluesFound: Object,
    cluesKey: String
  },
  data () {
    return {
      msg: 'Bienvenue sur la map',
      showclues: false,
      gmap: null,
      latitude: 0,
      longitude: 0,
      center: {lat: 48.861088, lng: 2.337513}, // this.content.lat, this.content.lng
      markers: [{position: {lat: 48.861088, lng: 2.337513}}],
      mapLoaded: false,
      placeFound: false,
      x: this.content.lat,
      y: this.content.long
    }
  },
  /* eslint-disable */
  mounted () {
      let script = document.createElement('script')
      console.log('loading script')
      script.onload = () => {
        console.log('script loaded')
        //var uluru = {lat: 48.861088, lng: 2.337513}
        this.gmap = new google.maps.Map(document.getElementById('gmap'), {zoom: 12, center: this.center})
        console.log('map created')
        var marker = new google.maps.Marker({position: this.center, title: 'Le Louvre'})
        marker.setMap(this.gmap)
        this.geolocate(this.markCurrentPosition)
      }
      script.async = true
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDo7xfcRgmf05fOijcTn51TJt31j8e7VjM'
      document.head.appendChild(script)
  },
  /* eslint-enable */
  methods: {
    signalChange: function (evt) {
      console.log('change')
      this.$emit('nextStep', evt)
    },
    geolocate: function (callback) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
        callback()
      })
    },
    /* eslint-disable */
    markCurrentPosition: function () {
      console.log('creating marker with coordinnates :' + this.latitude + '/' + this.longitude)
      var mymarker = new google.maps.Marker({
        icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
        position: {lat: this.latitude, lng: this.longitude},
        title: 'You'})
      mymarker.setMap(this.gmap)
      console.log('marker created')
      console.log('pos', this.latitude, this.longitude)
      console.log('x, y', this.x, this.y)
      console.log(this.latitude > this.x - 1)
      console.log(this.latitude < this.x + 1)
      if (this.latitude > this.x - 0.0001 && this.latitude < this.x + 0.0001 && this.longitude > this.y - 0.0001 && this.longitude < this.y + 0.0001){
        this.content.response = true
        // this.$emit('nextStep')
      }
    }
  },
  model: {
    event: 'change'
  }
}
</script>

<style>
#gmap {
  width: 0.1;
  height: 0.1;
  background-color: grey;
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
