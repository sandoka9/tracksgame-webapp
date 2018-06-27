/* eslint-disable */
<template>
<!--
<nav class="navbar navbar-default navbar-fixed-top">
  <div class="container">
    <router-link :to="{ name: 'HelloWorld' }">Home</router-link>
    <router-link :to="{ name: 'Login' }">Login</router-link>
    <router-link :to="{ name: 'Clues' }">Clues</router-link>
    <router-link :to="{ name: 'Steps' }">Steps</router-link>
    <router-link :to="{ name: 'Help' }">Help</router-link>
  </div>
</nav>
-->
<!--<button class="hamburger">&#9776;</button>-->
<nav class="navbar">
       <div class="container">
       <div class="navbar-brand is-large">
         <button class="hamburger navbar-item">&#9776;</button>
         <button @click="makeBurger" class="button navbar-burger" data-target="navMenu" v-bind:class="{active:false}">
             <span></span>
             <span></span>
             <span></span>
       </button>
       </div>
       <div class="navbar-menu" id="navMenu" v-bind:class="{ active: activator }">
         <div class="navbar-end">
           <a @click="makeBurger" class="navbar-item">
            <router-link :to="{ name: 'HelloWorld' }">Home</router-link>
          </a>
          <a @click="makeBurger" class="navbar-item">
           <router-link :to="{ name: 'Login' }">Login</router-link>
         </a>
       </div>
     </div>
     </div>
   </nav>
</template>
<script>
export default {
  name: 'Navbar',
  data () {
    return {
      msg: '',
      activator: false
    }
  },
  methods: {
    makeBurger () {
      this.activator = !this.activator
      return this.activator
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
