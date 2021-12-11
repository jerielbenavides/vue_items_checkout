<template>
  <div id="app">
    <Navbar :navItems="links" :cartItems="cartItems" :isLoggedIn= this.isLoggedIn></Navbar>
    <router-view @itemSelected="onItemSelected" @submitLoginForm="showNavLinks"/>
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
      isLoggedIn: false,
      links: [["Login", "login"]],
      cartItems: []
    }
  },
  methods: {
    // BOX SITE ONLY: Show alternative navbar when not logged in...
    showNavLinks: function(isLoggedIn){
      this.isLoggedIn = isLoggedIn;
      if(isLoggedIn){
        console.log('User logging in');
        this.links =  [["Items", "loan"],[`Cart`,'cart'],["Profile", 'profile'],["Logout", 'logout']];
      }
      else{
        console.log('User logging out');
        this.links =  [["Login", "login"]];
        this.cartItems = []; //Clearing the cart on logout.
      }
    },
    onItemSelected: function(cartItems){
      this.cartItems = cartItems;
      this.links =  [["Items", "loan"],[`Cart (${this.cartItems.length})`,'cart'],["Profile", 'profile'],["Logout", 'logout']];
    }
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

* { margin:0; padding:0; box-sizing:border-box; max-width: 100vw; max-height: 100vh; max-width: 100vw}

html{
    scroll-behavior: smooth;  
    max-width: 100%; 
    font-family: Lato-Regular;                    
}
#app {
  font-family: Lato-Regular, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.exaggerated_padding{
    padding: 5em !important;
}
.btn{
  background-color: #0B8261 !important;
}
h1{
  font-family: Oswald-Bold;
}
h5{
  font-family: Oswald-Bold;
}
p{
  font-size: 1.3em;
    color: #7e7e7e
}
.activeTab{
  color: #0B8261;
}
/* ALERT STYLES */
.alertConfirm{
    position: absolute !important;
    left: 25px !important;
    background-color: #0B8261 !important;
}
#modalDiv{
  font-family: 'Lato-Regular';
  display: flex;
  flex-direction: column;
  text-align: left;
}
.alertActionButtons{
    margin-bottom: 1em !important;
}
.alertTitle{
    display: flex !important;
    text-align: left;
    font-family: 'Oswald-Bold';
}
.swal2-close{
    position: absolute;
    right: 4;
    top: 4;
    background-color: #0B8261 !important;
    border: none;
}
.reservedItems{
    max-height: 10em !important;
}
#swal2-html-container{
  margin-top: 0em !important;
}
.alertFooter{
  display: flex;
  flex-direction: column;
  text-align: left;
}
/* Disabled items */
.isDisabled p{
      color: #9e9e9e !important;
}
.errorSpan{
  background: #f9c3c3;
  width: 100%;
  display: inherit;
  padding-left: 5px;
  color: darkred;
}
@media only screen and (min-width: 993px){
.container {
    width: 90% !important;
}
}
</style>
