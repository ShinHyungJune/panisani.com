<template>

</template>
<script>
export default {
    auth: "guest",

    data(){
        return {
            token: this.$route.query.token ?  this.$route.query.token : null,
        }
    },

    mounted() {
        this.$auth.loginWith('laravelSanctum', {
            data: {
                token:this.token
            }
        }).then(response => {

        }).catch((e) => {
            alert("소셜로그인에 실패하였습니다.");

            return this.$router.push("/");
        })
    }
}
</script>
