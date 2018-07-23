/* eslint-disable */
<template >
  <div id="hamburger">
    <div id="hamburger-content">
        <nav>
            <ul>
                <li><a href="#">Découvrir</a></li>
                <li><a href="#">Comment ça marche</a></li>
                <li><a href="#">À propos</a></li>
                <li><a href="#">FAQ</a></li>
            </ul>
        </nav>
        <a href="#" class="button button-sign-up">S'inscrire</a>
        <a href="#" class="button button-sign-in">Se connecter</a>
    </div>
    <button id="hamburger-button" @click="activeClass" @keydown="removeClass" >&#9776;</button>
    <div id="hamburger-sidebar">
        <div id="hamburger-sidebar-header"></div>
        <div id="hamburger-sidebar-body"></div>
    </div>
    <div id="hamburger-overlay" @click="removeOverlayClass" ></div>
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
      showNavBar: true,
      content: document.querySelector('#hamburger-content'),
      sidebarBody: document.querySelector('#hamburger-sidebar-body'),
      button: document.querySelector('#hamburger-button'),
      overlay: document.querySelector('#hamburger-overlay'),
      activatedClass: 'hamburger-activated'
    }
  },
  mounted: function () {
    this.sidebarBody.innerHTML = this.content.innerHTML
  },
  methods: {
    activeClass: function (e) {
      e.preventDefault()
      this.parentNode.classList.add(this.activatedClass)
    },
    removeClass: function (e) {
      if (this.parentNode.classList.contains(this.activatedClass)) {
        if (e.repeat === false && e.which === 27) {
          this.parentNode.classList.remove(this.activatedClass)
        }
      }
    },
    removeOverlayClass: function (e) {
      e.preventDefault()
      this.parentNode.classList.remove(this.activatedClass)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media screen and (max-width: 1024px) {
    h1 {
        font-size: 42px;
        line-height: 56px;
    }

    #hamburger-content {
        display: none;
    }

    #hamburger-button, #hamburger-sidebar,
    .hamburger-activated #hamburger-overlay {
        display: block;
    }

    .hamburger-activated #hamburger-sidebar {
        transform: translateX(0);
    }
}

</style>
