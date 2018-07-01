<template>
    <div id="abs1" class="absolute">
    <!--  <img src="/static/img/louvre/login.png" /> -->
    <div id="rel1" class="relative">
      <b>DIV #2</b><br />position: relative;
      <form>
          <input type="text" class="form-control" placeholder="Login" aria-describedby="basic-addon1">
          <input type="password" class="form-control" placeholder="Mot de passe" aria-describedby="basic-addon1">
          <button class="btn-submit form-control" aria-describedby="basic-addon1" value="GO !" type="submit">
          <router-link :to="{ name: 'Steps' }">
        GO !
          </router-link>
              </button>
      </form>
    </div>
</div>
</template>

/* eslint-disable */
<script>
export default {
  el: '#app',
  data () {
    return {
      text: ''
    }
  },
  methods: {
  }
}

</script>

<style>
b {
  font-family: sans-serif;
}

div {
  padding: 10px;
  border: 1px dashed;
  text-align: center;
}

input {
  width: 100%;
}
.static {
  position: static;
  height: 80px;
  background-color: #ffc;
  border-color: #996;
}

.absolute {
  position: absolute;
  width: 150px;
  height: 350px;
  background-color: #fdd;
  border-color: #900;
  opacity: 0.7;
}

.relative {
  position: relative;
  height: 80px;
  background-color: #cfc;
  border-color: #696;
  opacity: 0.7;
}

#abs1 {
  top: 10px;
  left: 10px;
}

#rel1 {
  top: 30px;
  margin: 0px 50px 0px 50px;
}
</style>
