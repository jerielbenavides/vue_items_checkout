<template>
    <nav >
        <div class="nav-wrapper container">
            <router-link id="logo-container" class="brand-logo" to="#"><img src="../assets/dc-logo-white.png"></router-link>
            <ul class="right hide-on-med-and-down">
                <li v-for="(navItem, index) in navItems" :key="index">
                    <router-link :id="navItem[1]"  v-bind:to="{ name: routeLinkGenerator(navItem[1]), params: {cartItems: cartItems, isLoggedIn: isLoggedIn } }">{{ navItem[0].toUpperCase() }}</router-link> 
                </li>
            </ul>
            <ul id="nav-mobile" class="sidenav">
                <li v-for="(navItem, index) in navItems" :key="index">
                    <router-link :id="navItem[1]" v-bind:to="{ name: routeLinkGenerator(navItem[1]), params: {cartItems: cartItems, isLoggedIn: isLoggedIn }}" >{{ navItem[0].toUpperCase() }}</router-link> 
                </li>
            </ul>
            <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
    props: {
        navItems: {
            type: Array
        },
        cartItems: {
            type: Array
        },
        isLoggedIn: {
            type: Boolean
        },
    },
    // data() {
    //     return {
    //     artItems: cartItems,
    //     }
    // },
    methods: {
        routeLinkGenerator: function (navName){
            return `${navName}`;
        }
    }
}
</script>

<style>
/* #nav{
    display: flex;
    background: gray;
    padding: 1em;
    gap: 1em;
    color: black;
} */
nav{
    background-color: #0B8261 !important;
}
.sidenav{
    background-color:#0B8261 !important;
}
.sidenav li > a {
    color: white !important;
}

.nav-wrapper a:hover {
    color: greenyellow;
    transform: scale(1.01);
}
.nav-wrapper a.router-link-exact-active {
    color:  greenyellow;
}
#logo-container{
    height: 100%;
    display: flex;
    place-items: center;
}
#logo-container img{
    height: 50px;

}
</style>