<template>
    <div class="logout">
        <p>Logging out...</p>
    </div>
</template>

<script>
// @ is an alias to /src


export default {
    name: 'Logout',
    mounted() {
        //Probably wrong to create a view just to log out...
        //TODO: Implement this for real (clear cookies, etc)
        console.log('Logging out...');
        this.$emit("submitLoginForm", false);
        this.$router.push({path: '/login'});
}
}
</script>
