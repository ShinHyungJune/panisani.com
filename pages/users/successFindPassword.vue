<template>
    <main class="find_account done">
        <div class="title-wrap">
                <span class="icon">
                    <i class="xi-check"></i>
                </span>
            <h2 class="title scd5">비밀번호가 변경 되었습니다.</h2>
            <p class="txt">새로운 비밀번호로 로그인해주세요.</p>
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
