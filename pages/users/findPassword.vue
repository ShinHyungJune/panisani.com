<template>
    <section class="space-box top top-space">
        <div class="space-box-inner">
            <div class="container">
                <div class="title-box mb72">
                    <img src="/images/img_page_logo.png" class="logo">
                    <h2>비밀번호 재설정</h2>
                </div>
                <div class="form-box">
                    <input-verify-number @verified="store" />
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
                email: "",
            }),
        }
    },
    methods: {
        store(data){
            this.form.email = data;

            this.form.post("/api/findPasswords")
                .then(response => {
                    this.$store.commit("setPop", {
                        title: "초기화 메일이 발송되었습니다!"
                    })
                });
        },
    },

    computed: {

    },

    mounted() {

    }
}
</script>
