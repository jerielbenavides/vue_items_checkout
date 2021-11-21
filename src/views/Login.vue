<template>
    <div class="row container login_container">
        <div class="login_form col s12 m12 l3">
            <h5>EQUIPMENT SIGN OUT</h5>
            <p></p>
            <p id="login_errors"></p>
            <form class="" @submit.prevent="submitLoginForm()">
                    <div class="input-field">
                        <input id="studentId" type="text" class="validate">
                        <label for="studentId">Student ID</label>
                    </div>
                    <div class="input-field">
                        <input id="password" password="Password" type="password" class="validate">
                        <label for="password">Password</label>
                    </div>
                    <button class="btn waves-effect waves-light" type="submit" name="action">Sign In</button>
            </form>
            <div id="login_links">
                <a href="/passwordreset" class="">Forgot Password?</a>
                <a href="/register" class="">Create Account</a>
            </div>
        </div>
        <div class="col l9 hide-on-med-and-down">
            <div id="login_img">
                <img src="../assets/logo_wall.jpg">
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'Login',
    components: {
    // HelloWorld
    },
    methods: {
        submitLoginForm: function(){
            console.log('Submitting login form');
            // TODO: Make this actually work
            this.$emit("submitLoginForm", true);
            this.$router.push({path: '/loan'});
        }
    }
}
</script>

<style scoped>
.login_container{
    overflow: hidden;
}
.input-field input{
    /* border: 1px solid !important; */
}
.exaggerated_padding{
    padding: 5em !important;
}
.login_form{
    /* padding: 100px; */
    margin-top: 1em;
}
#login_img{
    position: absolute;
    width: 70vw;
    padding-left: 10vw;
}
#login_img img{
    width: 100%;
    min-height: 100vh;
    aspect-ratio: 1;
    /* width: calc(100% + 11vw);
    height: 100vh; */
}
#login_links{
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    gap: 0.75em;
}
#login_links a{
    text-decoration: none;
    color: #414042;
}
</style>
