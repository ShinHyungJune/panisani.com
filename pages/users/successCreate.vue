<template>
    <section class="space-box center">
        <div class="space-box-inner">
            <div class="container">
                <div class="title-box mb40">
                    <img src="/images/img_page_logo.png" class="logo sm">
                </div>
                <div class="reg-order-box">
                    <ul>
<!--                        <li class="order-01 active"><p><b>1. 본인 인증</b></p></li>-->
                        <li class="order-02 active"><p><b>1. 정보 입력</b></p></li>
                        <li class="order-03 active on"><p><b>2. 가입 완료</b></p></li>
                    </ul>
                </div>
                <div class="title-box mt80 pt20 mb80 pb80 mt-lg-50 pt-lg-0 mb-lg-50 pb-lg-0">
                    <p>성공적으로 회원가입이 완료되었습니다.</p>
                    <h2 class="mt16">파니사니에 오신 걸 환영해요!</h2>
                </div>
                <div class="button-box mx-box">
                    <nuxt-link to="/login" class="btn btn-bd-active btn-md">로그인하기</nuxt-link>
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

            })
        }
    },
    methods: {

    },

    computed: {

    }
}
</script>
