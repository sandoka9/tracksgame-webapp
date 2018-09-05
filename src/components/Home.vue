<template>
  <div class="home-content">
    <div class="content-game">
      <router-link :to="{ name: 'DetailsGame', params: { gameId: 'rBnjvYj5K' } }"><img src="/index/images_game_rBnjvYj5K.jpg" /></router-link>
      <span class="content-game-title"> title </span>
      <router-link :to="{ name: 'DetailsGame', params: { gameId: 'sCmkwZ6L' } }"><img src="/index/images_game_sCmkwZ6L.jpg" /></router-link>
      <span class="content-game-title"> title </span>
    </div>
    <div class="content-game2" v-for="item in content" :key="item.id">
      <router-link :to="{ name: 'DetailsGame', params: { gameId: item.id } }"><img :src="item.src" /></router-link>
      <span class="content-game-title"> {{item.title}} </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      urlJson: 'http://localhost:8080/index/home.json',
      content: {},
      content2: {}
    }
  },
  beforeCreated () {
    fetch('http://localhost:8080/index/home.json')
      .then(function (response) {
      // Do stuff with the response
        // console.log('response' + JSON.stringify(response.json()))
      })
      .then(function (json) {
        console.log('json' + JSON.stringify(json))
      })
      .catch(function (error) {
        console.log('Looks like there was a problem: \n', error)
      })
  },
  created () {
    localStorage.clear()
    localStorage.stepIndex = ''
    localStorage.tgId = ''
    localStorage.cluesFound = ''
    localStorage.json = ''
    localStorage.gmap = ''
    localStorage.marker = ''
    localStorage.stepDone = JSON.stringify({})
    localStorage.stepDoneNb = 0
    localStorage.enigmaType = ''
    console.log('top')
    this.fetchData2()
  },
  methods: {
    fetchData: function () {
      console.log('this.urlJson' + this.urlJson)
      fetch('http://localhost:8080/index/home.json')
        .then(function (response) { return response.json() })
      /* .then(r => r.json()) */
        .then(function (json) {
          /* console.log('json' + JSON.stringify(json)) */
        })
        .catch(function (e) { console.log('e: ' + e) })
      /* for(var i = 0; i < json.products.length; i++) {
        var listItem = document.createElement('li');
        listItem.innerHTML = '<strong>' + json.products[i].Name + '</strong>';
        listItem.innerHTML +=' can be found in ' + json.products[i].Location + '.';
        listItem.innerHTML +=' Cost: <strong>£' + json.products[i].Price + '</strong>';
        myList.appendChild(listItem);
      } */

      /*
      fetch('products.json')
      .then(function(response) { return response.json(); })
      .then(function(json) {
        for(var i = 0; i < json.products.length; i++) {
          var listItem = document.createElement('li');
          listItem.innerHTML = '<strong>' + json.products[i].Name + '</strong>';
          listItem.innerHTML +=' can be found in ' + json.products[i].Location + '.';
          listItem.innerHTML +=' Cost: <strong>£' + json.products[i].Price + '</strong>';
          myList.appendChild(listItem);
        }
      })
      */
      /*
        fetch('http://localhost:8080/index/home.json')
          .then(function (response) { return response.json() })
          .then(function (json) { console.log('json' + json.game.id) })
          .catch(function (error) {
            console.log('Looks like there was a problem: \n', error)
          })
      */
    },
    fetchData2: function () {

    }
  }
}

</script>

<style scoped>

.home-content {
  background-color: black;
  height: 500vw;
}

.content-game {
  width:60vw;
  padding: 4vw;
}

.content-game img {
  width: 50vw;
  border: 0.5vw solid white;
}

.content-game-title {
  color: grey;
  font-weight: bold;
  color: #FBB50C;
}

</style>
