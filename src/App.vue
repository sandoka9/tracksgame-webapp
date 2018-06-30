/* eslint-disable */
<template>

  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <header-component></header-component>
    <router-view/>
  </div>
</template>

<script>
import HeaderComponent from './components/Header.vue'
export default {
  name: 'App',
  components: {
    HeaderComponent
  }
}
</script>

<style>
@import url(https://maxcdn.bootstrapcdn.com/twitter-bootstrap/4.1.1/css/bootstrap.css);
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css);

</style>
