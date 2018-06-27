<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <nav class="navbar navbar-default navbar-fixed-top"> 
      <div class="container">
        <router-link :to="{ name: 'HelloWorld' }">Home</router-link>
        <router-link :to="{ name: 'Login' }">Login</router-link>
        <router-link :to="{ name: 'Clues' }">Clues</router-link>
        <router-link :to="{ name: 'Steps' }">Steps</router-link>
        <router-link :to="{ name: 'Help' }">Help</router-link>
      </div> 
    </nav>
    

    <router-view/>
    <p>Fin</p>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url(https://maxcdn.bootstrapcdn.com/twitter-bootstrap/4.1.1/css/bootstrap.css);
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css);

</style>
