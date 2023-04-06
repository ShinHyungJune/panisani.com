<template>
    <div id="wrap" class="col-group">
        <Nuxt/>
    </div>

</template>
<script>
export default {
    head() {
        return {
            link: [
            ],
        }
    },

    components: {},
    mounted() {
        if(this.$route.path !== "/admin/login" && (!this.$auth.user || !this.$auth.user.data.admin))
            return this.$router.push("/admin/login");
    }
}
</script>
