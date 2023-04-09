<template>
    <section class="space-box top top-space">
        <div class="space-box-inner">
            <div class="container">
                <div class="title-box mb72">
                    <img src="/images/img_page_logo.png" class="logo">
                    <h2>비밀번호 재설정</h2>
                </div>
                <div class="form-box">
                    <form @submit.prevent="store">
                        <div class="input-box mb16 mb-lg-10">
                            <div class="box">
                                <input type="password" placeholder="새로운 비밀번호를 작성해주세요. 입력해주세요." v-model="form.password_new">
                            </div>
                            <error :form="form" name="password_new" />
                        </div>
                        <div class="input-box">
                            <div class="box">
                                <input type="password" placeholder="비밀번호를 확인해주세요." v-model="form.password_new_confirmation">
                            </div>
                            <error :form="form" name="password_new_confirmation" />
                            <error :form="form" name="token" />
                            <div class="message-box mt10 px30 px-lg-15">
                                <p>8자 이상 문자와 숫자를 섞어서 입력해주세요.<br>단  ‘!, @, #, $, %, ^, &, * ‘이 외의 특수문자는 사용할 수 없습니다. </p>
                            </div>
                        </div>

                        <div class="button-box mt60 mt-lg-30">
                            <button type="submit" class="btn btn-active">확인</button>
                        </div>
                    </form>
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
                    this.$store.commit("setPop", {
                        title: "초기화 성공",
                        description: "비밀번호가 초기화되었습니다."
                    });

                    this.$router.push(`/users/successFindPassword`);
                });
        },
    },

    computed: {

    },

    mounted() {

    }
}
</script>
