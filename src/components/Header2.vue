/* eslint-disable */
<template >
  <div class="dropdown" v-bind:class="{ open: activator }" id="bar-nav" v-show="showNavBar">
   <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded=true  @click="makeBurger">
   <!-- &#9776; -->
   <i class="fa fa-th"></i>
   <span class="caret"></span>
   </button>
   <ul class="dropdown-menu-sur" ref="liste" aria-labelledby="dropdownMenu1" ><!--v-bind:style="{ display: isDisplay }"-->
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
    this.$refs['liste'].style.display = 'none'
    if (this.$route.name === 'Login') {
      this.showNavBar = false
    } else {
      this.showNavBar = true
    }
  },
  methods: {
    makeBurger () {
      this.activator = !this.activator
      this.check = this.$refs['liste'].style.display
      if (this.check === '') {
      /*  this.isDisplay = 'none' */
        this.$refs['liste'].style.display = 'none'
      } else {
      /*  this.isDisplay = '' */
        this.$refs['liste'].style.display = ''
      }
      return this.$refs['liste'].style.display
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #727272;
}
button, html [type="button"], [type="reset"], [type="submit"] {
    background-color: white;
}
.btn {
  font-size: 0.1rem; /* 3rem; */
}
.divider {
  border: 1px solid rgba(0, 0, 0, 0.15);
}
.dropdown-menu .divider {
  height: 1px;
  margin: 9px 0;
  overflow: hidden;
  background-color: #e5e5e5;
}
.dropdown-menu-sur {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    float: left;
    min-width: 150rem;
    padding: 0.5rem 0;
    margin: 0.125rem 0 0;
    font-size: 3rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
}
.dropdown {
  font-size: 2rem;
  /*min-width: 50rem;*/
  /*opacity: 0.5;*/
}
.dropdown-toggle::after{
  content: none;
}

</style>
