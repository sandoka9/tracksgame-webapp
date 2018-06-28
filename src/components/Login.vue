<template>
  <div class="login-container">
    <form>
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Login" aria-describedby="basic-addon1">
      </div>
      <div class="input-group">
        <input type="password" class="form-control" placeholder="Mot de passe" aria-describedby="basic-addon1">
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
.login-container{
  background-image: url(../assets/login.png);
  min-height: 100vh;
  background-color: 0 0 255 0.5;
  padding-top: 65vh;
}
.input-group{
  background-color: white;
  opacity:0.8;
  text-align: center;
}
.dropdown[data-v-61dd7a3d] {
  display: none !important;
}
</style>
