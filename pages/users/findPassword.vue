<template>
    <main class="find_account">
        <div class="title-wrap">
            <h2 class="title scd5">
                <span class="red scd5">왓픽</span> 비밀번호 찾기
            </h2>
            <p class="txt">가입 시 사용했던 휴대폰번호 인증으로 비밀번호를 재설정할 수 있습니다.</p>
        </div>
        <div class="find-method container row-group">
            <form action="">
                <div class="method-box form row-group">
                    <input type="text" placeholder="아이디" v-model="form.ids" style="border:1px solid #e1e1e1;"> <!-- 일치하는 정보가 없을 때 wrong 클래스 추가 -->

                    <input-verify-number @verified="data => form.contact = data" />

                    <p class="m-input-error" v-if="form.errors.has('contact')">{{form.errors.get('contact')}}</p>
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
                contact: "",
                ids: "",
            }),
        }
    },
    methods: {
        store(){
            this.form.post("/api/findPasswords")
                .then(response => {
                    this.$router.push(`/users/resetPassword?token=${response.data.token}`);
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
