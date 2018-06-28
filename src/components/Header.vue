/* eslint-disable */
<template >
  <div class="dropdown" v-bind:class="{ open: activator }" id="bar-nav" v-show="showNavBar">
   <button class="hamburger btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded=true  @click="makeBurger">
   &#9776;
   <span class="caret"></span>
   </button>
   <ul class="dropdown-menu" aria-labelledby="dropdownMenu1" v-bind:style="{ display: isDisplay }" >
     <li @click="makeBurger"><router-link :to="{ name: 'Login' }">Login</router-link></li>
     <li role="separator" class="divider"></li>
     <li @click="makeBurger"><router-link :to="{ name: 'Steps' }">Steps</router-link></li>
     <li role="separator" class="divider"></li>
     <li @click="makeBurger"><router-link :to="{ name: 'Clues' }">Clues</router-link></li>
  </ul>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  data () {
    return {
      msg: '',
      activator: true,
      isDisplay: 'none',
      showNavBar: true
    }
  },
  mounted: function () {
    if (this.$route.name === 'Login') {
      this.showNavBar = false
    } else {
      this.showNavBar = true
    }
  },
  methods: {
    makeBurger () {
      this.activator = !this.activator
      if (this.isDisplay === '') {
        this.isDisplay = 'none'
      } else {
        this.isDisplay = ''
      }
      return this.activator
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dropdown-menu .divider {
  height: 1px;
  margin: 9px 0;
  overflow: hidden;
  background-color: #e5e5e5;
}
.dropdown-menu {
  font-size: 1.5em;
  min-width: 100vh;
}
.dropdown {
  font-size: 2rem;
  /*min-width: 50rem;*/
  /*opacity: 0.5;*/
}
.btn {
  font-size: 3rem;
}
.dropdown-toggle::after{
  content: none;
}

</style>
