<template>
  <div class="hello">
    <h1>{{ msg }} hey !</h1>
    <h2>Essential Links</h2>
    <ul>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Clues',
  data () {
    return {
      msg: 'Bienvenu sur la page Clues'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
