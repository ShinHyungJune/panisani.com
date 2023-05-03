<template>
    <section class="space-box top top-space">
        <div class="space-box-inner">
            <div class="container">
                <div class="title-box mb72">
                    <img src="/images/img_page_logo.png" class="logo">
                    <h2>아이디 찾기</h2>
                </div>

                <div class="form-box">
                    <input-verify-number :find-id="1" @verified="(data) => {form.email = data; this.store()}" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Form from "../../utils/Form";
export default {
    layout: "empty",
    data(){
        return {
            form : new Form(this.$axios, {
                email: ""
            }),
        }
    },
    methods: {
        store(){
            this.form.post("/api/findIds")
                .then(response => {
                    this.$router.push(`/users/successFindId?email=${response.data.email}`);
                });
        },
    },

    computed: {

    },

    mounted() {

    }
}
</script>
