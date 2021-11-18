<template>
  <div id="app">
    <Navbar :navItems="links"></Navbar>
    <router-view/>
    <Footer></Footer>
  </div>
</template>
<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer.vue'
import M from 'materialize-css'
export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  mounted () {
    M.AutoInit()
  },
  data() {
    return {
      links: [["Items", "items"],["Cart",'cart'],["Profile", 'profile'],["Logout", 'logout']]
    }
  },
  methods: {

  },
}
</script>
<style>


@font-face {
  font-family: "Lato-Regular";
  src: local("Lato-Regular"),   url(./fonts/Lato-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "Oswald-Bold";
  src: local("Oswald-Bold"),   url(./fonts/Oswald-Bold.ttf) format("truetype");
}

* { margin:0; padding:0; box-sizing:border-box; }

html{
    scroll-behavior: smooth;  
    max-width: 100%; 
    font-family: Lato-Regular;                    
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h1{
  font-family: Oswald-Bold;
}
h5{
  font-family: Oswald-Bold;
}
</style>
