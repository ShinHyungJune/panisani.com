<template>
    <section class="space-box center">
        <div class="space-box-inner">
            <div class="container">
                <div class="title-box mb72 mb-lg-35">
                    <img src="/images/img_page_logo.png" class="logo">
                </div>
                <div class="form-box mt50 mt-lg-0 pt50 pt-lg-0">
                    <div class="button-box mb32 mb-lg-32">
                        <div class="col-12">
                            <nuxt-link to="/users/create" class="btn btn-active">파니사니 회원가입</nuxt-link>
                        </div>
                        <div class="col-12 mt24 mt-lg-12">
                            <a href="#" class="btn btn-ft-active" @click="alert">어린이 / 청소년회원 (14세 미만)</a>
                        </diV>
                    </div>
                    <div class="member-box mt50 mt-lg-50 pt50 pt-lg-0">
                        <div class="member-box-sns mt64 mt-lg-32">
                            <b>간편 회원가입</b>
                            <dl>
                                <dd class="naver"><a :href="`${$store.state.domain}/openLoginPop/naverCustom`">네이버 로그인</a></dd>
                                <dd class="kakao"><a :href="`${$store.state.domain}/openLoginPop/kakaoCustom`">카카오 로그인</a></dd>
                                <dd class="google"><a :href="`${$store.state.domain}/openLoginPop/google`">구글 로그인</a></dd>
                            </dl>
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
        alert(){
            this.$store.commit("setPop", {
                title: "가입불가",
                description: "14세 이상만 가입 가능합니다."
            })
        }

    },

    computed: {

    },

    mounted() {

    }
}
</script>
