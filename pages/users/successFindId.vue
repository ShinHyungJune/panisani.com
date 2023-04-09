<template>
    <section class="space-box top top-space">
        <div class="space-box-inner">
            <div class="container">
                <div class="title-box mb72 mb-lg-35">
                    <img src="/images/img_page_logo.png" class="logo">
                    <h2>성공적으로 고객님의 정보를 찾았습니다.</h2>
                </div>
                <div class="mx-box mt100 pt100 mt-lg-50 pt-lg-50">
                    <div class="paragraph-box mb24 mb12">
                        <div class="tit">
                            <p class="tc">고객님의 아이디는 <b>{{$route.query.email}}</b> 입니다.</p>
                        </div>
                    </div>
                    <div class="button-box">
                        <div class="col-6 pr12 pr-lg-6">
                            <nuxt-link to="/users/findPassword" class="btn btn-bd-active btn-md">비밀번호 찾기</nuxt-link>
                        </div>
                        <div class="col-6 pl12 pl-lg-6">
                            <nuxt-link to="/login" class="btn btn-bd-active btn-md">로그인</nuxt-link>
                        </div>
                    </div>
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
