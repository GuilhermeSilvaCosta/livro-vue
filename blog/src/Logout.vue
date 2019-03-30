<template>
    <h4>Logout</h4>
</template>
<script>
export default {
    data (){
        return {

        }
    },
    created: function() {
        Auth.logout();
        console.log(Auth.getLogin());
        this.$router.go('/home');
    }
}
</script>
