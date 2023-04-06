<template>
    <main class="subpage join_done form">
        <div class="container">
            <div class="txt-box">
                <p class="title scd6">
                    <span class="scd6">왓픽</span> 회원가입을 환영합니다.
                </p>
                <p class="txt">
                    PC, 모바일로 같은 서비스를 이용가능합니다. 언제 어디서나 친절한 중고차 구매 도우미 <span class="red">왓픽</span>
                </p>

                <div class="method-box form row-group">
                    <input type="password" placeholder="기존 비밀번호를 입력해주세요" v-model="form.password">
                    <input type="password" placeholder="새로운 비밀번호를 입력해주세요" v-model="form.password_new"> <!-- 일치하는 정보가 없을 때 wrong 클래스 추가 -->
                    <input type="password" placeholder="비밀번호 확인" v-model="form.password_new_confirmation"> <!-- 일치하는 정보가 없을 때 wrong 클래스 추가 -->
                    <p class="guide">영문 대문자와 소문자, 숫자, 특수문자 중 2가지 이상을 조합하여 6~20자로 입력해주세요</p>
                    <p class="wrong" v-if="form.errors.has('password')">{{form.errors.get("password")}}</p>
                    <p class="wrong" v-if="form.errors.has('password_new')">{{form.errors.get("password_new")}}</p>
                    <p class="wrong" v-if="form.errors.has('token')">{{form.errors.get("token")}}</p>
                </div>

                <nuxt-link to="/" class="form-submit">홈으로 가기</nuxt-link>
            </div>
        </div>
    </main>
</template>

<script>
import Form from "../../utils/Form";
export default {
    name: 'Login',
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
