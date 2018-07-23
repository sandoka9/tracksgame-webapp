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
                <img :src="element.image" />
              </li>
            </ul>
        </div>
      </div>
      <div>
        <input class="response form-control" type="hidden" name="response" v-model="content.response['lat']" v-on:change="$emit('change', $event.target.value)"/>
        <!-- Get lat/long user and check if it is < > treasure coord. And go on final step-->
      </div>
    <div> <!--  v-if="stepIndex == 6 || stepIndex == 7 " -->
    <button type="button" class="btn btn-light" v-on:click="$emit('moreIndex')">Découvrir de nouveaux indices</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TracksIntro',
  props: {
    content: Object,
    cluesFound: Object
  },
  data () {
    return {
      msg: 'Bienvenue sur la map',
      showclues: false,
      latitude: 0,
      longitude: 0
    }
  },
  /* eslint-disable */
  mounted () {
    let script = document.createElement('script')
    console.log('loading script')
    script.onload = () => {
      console.log('script loaded')
      this.geolocate(this.markCurrentPosition)
    }
  },
  /* eslint-enable */
  methods: {
    geolocate: function (callback) {
      navigator.geolocation.getCurrentPosition(position => {
        this.content.response['lat'] = position.coords.latitude
        this.content.response['long'] = position.coords.longitude
        callback()
      })
    }
  },
  model: {
    event: 'change'
  }
}
</script>

<style>

.radiobtn {
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    background-color: #eee;
    border-radius: 50%;
}
</style>
