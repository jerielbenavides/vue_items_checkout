<template>
    <div class="container row">
        <div class="col s12 m6 l4">
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
</style>
