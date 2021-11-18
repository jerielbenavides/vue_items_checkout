<template>
    <div class="row container">
        <div class="login_form col s12 m6 l3">
            <h5>EQUIPMENT SIGN OUT</h5>
            <p></p>
            <p id="login_errors"></p>
            <form class="">
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
        </div>
        <div class="col s0 m6 l9">
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
    }
}
</script>

<style scoped>
.input-field input{
    /* border: 1px solid !important; */
}
.exaggerated_padding{
    padding: 5em !important;
}
.login_form{
    padding: 100px;
}
#login_img{
    position: absolute;
    width: 80vw;
    padding-left: 10vw;
}
#login_img img{
    width: 100%;
    min-height: 100vh;
    /* width: calc(100% + 11vw);
    height: 100vh; */
}
</style>
