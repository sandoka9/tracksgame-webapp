<template>
  <div class="login-container">
    <img src="/static/img/louvre/login.png" />
    <form>
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Login" aria-describedby="basic-addon1">
      </div>
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Password" aria-describedby="basic-addon1">
      </div>
      <div class="input-group">
        <button class="form-control" aria-describedby="basic-addon1" value="GO !" type="submit">
          <router-link :to="{ name: 'Steps' }">
            GO !
          </router-link>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Bienvenu sur la page Login'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  max-height: 70vh;
}

.input-group{
  background-color: white;
  opacity:0.8;
  text-align: center;
}

.login-container{
  background-color: #ada37e;
  min-height: 100vh;
  background-color: 0 0 255 0.5;
}

.input-group > .form-control {
    font-size: xx-large;
    font-weight: bold;
}
</style>
