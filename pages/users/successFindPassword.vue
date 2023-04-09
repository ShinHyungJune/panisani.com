<template>
    <section class="space-box top top-space">
        <div class="space-box-inner">
            <div class="container">
                <div class="title-box mb72 mb-lg-35">
                    <img src="/images/img_page_logo.png" class="logo">
                    <h2>성공적으로 비밀번호가 변경되었습니다.</h2>
                    <p>변경된 비밀번호로 로그인해주세요.</p>
                </div>
                <div class="mx-box mt100 pt100 mt-lg-50 pt-lg-50">
                    <div class="button-box">
                        <nuxt-link to="/login" class="btn btn-bd-active btn-md">로그인</nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Form from "../../utils/Form";
export default {
    layout:"empty",
    data(){
        return {
            form : new Form(this.$axios, {

            }),
        }
    },
    methods: {


    },

    computed: {

    },

    mounted() {

    }
}
</script>
