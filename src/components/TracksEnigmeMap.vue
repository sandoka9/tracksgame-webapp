<template>
  <div class="content">
    <div class="content-title">  {{content.title}} </div>
    <div class="content-subtitle">{{content.shortDescription}}</div>
    <div class="content-description">{{content.stepDescription}}</div>
    <div class="content-game col-md-2 enigmeMap" v-for="item in content.info" :key="item.indice" >
            <img :src="cluesFound[item.indice]" />
    </div>
    <div  class="content-response"> <!--  v-if="stepIndex == 6 || stepIndex == 7 " -->
      <button type="button" class="btn btn-light" v-on:click="$emit('moreIndex')" v-if="cluesKey !== '' && stepIndexEnd == false">{{cluesKey}} + Découvrir de nouveaux indices</button>
    </div>
    {{stepIndexEnd}}
    <div id="gmap"></div>
  </div>
</template>

<script>

export default {
  name: 'TracksIntro',
  props: {
    content: Object,
    cluesFound: Object,
    cluesKey: String,
    stepIndexEnd: Boolean
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
      script.onload = () => {
        //var uluru = {lat: 48.861088, lng: 2.337513}
        this.gmap = new google.maps.Map(document.getElementById('gmap'), {zoom: 12, center: this.center})
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
    geolocate: function (callback) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
        callback()
      })
    },
    /* eslint-disable */
    markCurrentPosition: function () {
      var mymarker = new google.maps.Marker({
        icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
        position: {lat: this.latitude, lng: this.longitude},
        title: 'You'})
      mymarker.setMap(this.gmap)
      console.log(this.latitude, this.x+0.001, this.longitude,this.y+0.001)
      console.log(this.latitude > this.x - 0.001, this.latitude < this.x + 0.001, this.longitude > this.y - 0.001, this.longitude < this.y + 0.001)
      if (this.latitude > this.x - 0.1 && this.latitude < this.x + 0.001 && this.longitude > this.y - 0.1 && this.longitude < this.y + 0.001){
        console.log('WIN')
        this.content.response = true
        this.$emit('nextStep')
      }
    }
  },
  model: {
    event: 'change'
  }
}
</script>

<style scoped>
#gmap {
  width: 0.1;
  height: 0.1;
  background-color: grey;
}

.content-game{
  list-style: none;
  display: inline;
}

.content-game img{
  width:15vh;
}

.content-response{

}

</style>
