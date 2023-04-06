<template>
    <main class="find_account">
        <div class="title-wrap">
            <h2 class="title scd5">
                <span class="red scd5">왓픽</span> 비밀번호 찾기
            </h2>
            <p class="txt">새로운 비밀번호를 등록해주세요.</p>
        </div>
        <div class="find-method container row-group">
            <form action="">
                <div class="method-box form row-group">
                    <input type="password" placeholder="기존 비밀번호를 입력해주세요" v-model="form.password">
                    <input type="password" placeholder="새로운 비밀번호를 입력해주세요" v-model="form.password_new"> <!-- 일치하는 정보가 없을 때 wrong 클래스 추가 -->
                    <input type="password" placeholder="비밀번호 확인" v-model="form.password_new_confirmation"> <!-- 일치하는 정보가 없을 때 wrong 클래스 추가 -->
                    <p class="guide">영문 대문자와 소문자, 숫자, 특수문자 중 2가지 이상을 조합하여 6~20자로 입력해주세요</p>
                    <p class="wrong" v-if="form.errors.has('password')">{{form.errors.get("password")}}</p>
                    <p class="wrong" v-if="form.errors.has('password_new')">{{form.errors.get("password_new")}}</p>
                    <p class="wrong" v-if="form.errors.has('token')">{{form.errors.get("token")}}</p>
                </div>
            </form>
            <button type="button" class="next-btn" @click="store">
                다음 <i class="xi-angle-right"></i>
            </button>
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
                password: "",
                password_new: "",
                password_new_confirmation: "",
                token: this.$route.query.token,
            }),
        }
    },
    methods: {
        store(){
            this.form.patch("/api/findPasswords")
                .then(response => {
                    this.$router.push(`/users/successFindPassword`);
                }).catch(error => {
                    if(error.message && error.message.includes("invalid"))
                        return alert("입력값을 확인해주세요.");

                    if(error.message)
                        return alert(error.message);
            })
        },
    },

    computed: {

    },

    mounted() {

    }
}
</script>
