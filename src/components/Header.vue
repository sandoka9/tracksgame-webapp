/* eslint-disable */
<template>
  <div class="dropdown" v-bind:class="{ open: activator }">
   <button class="hamburger btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded=true  @click="makeBurger">
   &#9776;
   <span class="caret"></span>
   </button>
   <ul class="dropdown-menu" aria-labelledby="dropdownMenu1" v-bind:style="{ display: isDisplay }" >
     <li @click="makeBurger"><router-link :to="{ name: 'HelloWorld' }" >Home</router-link></li>
     <li role="separator" class="divider"></li>
     <li @click="makeBurger"><router-link :to="{ name: 'Login' }" title="Lien 2">Login</router-link></li>
     <li role="separator" class="divider"></li>
     <li @click="makeBurger"><router-link :to="{ name: 'Steps' }" title="Lien 3">Steps</router-link></li>
     <li role="separator" class="divider"></li>
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
      isDisplay: 'none'
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
.dropdown-menu{
  font-size: 2rem;
  min-width: 50rem;
}
.btn {
  font-size: 3rem;
}
.dropdown-toggle::after{
  content: none;
}

</style>
