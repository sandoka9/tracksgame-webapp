<template>
    <div id="gmap"></div>
</template>

<script>
export default {
  name: 'tracksmap',
  props: ['content'],
  data () {
    return {
      msg: 'Bienvenue sur la map',
      gmap: null,
      latitude: 0,
      longitude: 0,
      center: {lat: 48.861088, lng: 2.337513}, // this.content.lat, this.content.lng
      markers: [{position: {lat: 48.861088, lng: 2.337513}}],
      mapLoaded: false
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
    }
    /* eslint-enable */
  }
}
</script>

<style scoped>
 #gmap {
   width: 90%;
   height: 600px;
   background-color: grey;
 }
</style>
