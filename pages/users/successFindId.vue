<template>
    <main class="find_account done">
        <div class="title-wrap">
                <span class="icon">
                    <i class="xi-check"></i>
                </span>
            <h2 class="title scd5">고객님의 아이디는 <span class="red scd5">{{ $route.query.ids }}</span> 입니다.</h2>
            <div class="txt-box row-group">
                <p class="txt">비밀번호가 기억나지 않으신가요?</p>
                <nuxt-link to="/users/findPassword">비밀번호 재설정하기</nuxt-link>
            </div>

        </div>
        <nuxt-link to="/login" class="next-btn">
            로그인 페이지 <i class="xi-angle-right"></i>
        </nuxt-link>
    </main>
</template>

<script>
import Form from "../../utils/Form";
export default {
    name: 'Login',
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
