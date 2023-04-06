<template>
    <main class="find_account">
        <div class="title-wrap">
            <h2 class="title scd5">
                <span class="red scd5">왓픽</span> 아이디 찾기
            </h2>
            <p class="txt">가입 시 사용했던 휴대폰번호 인증으로 아이디를 찾을 수 있습니다.</p>
        </div>
        <div class="find-method container row-group">
            <form action="">
                <div class="method-box form row-group">
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
                contact: ""
            }),
        }
    },
    methods: {
        store(){
            this.form.post("/api/findIds")
                .then(response => {
                    this.$router.push(`/users/successFindId?ids=${response.data.ids}`);
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
