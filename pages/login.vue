<template>
    <section class="space-box center">
        <div class="space-box-inner">
            <div class="container">
                <div class="title-box mb72 mb-lg-35">
                    <img src="/images/img_page_logo.png" class="logo">
                </div>
                <div class="form-box">
                    <form @submit.prevent="login" @keydown="() => {form.errors.clear()}">
                        <div class="input-box mb16 mb-lg-10">
                            <div class="box">
                                <input type="text" placeholder="이메일 아이디를 입력해주세요." v-model="form.email">
                            </div>
                            <error :form="form" name="email" />
                        </div>
                        <div class="input-box mb16 mb-lg-10">
                            <div class="box">
                                <input type="password" placeholder="비밀번호를 입력해주세요." v-model="form.password">
                            </div>
                            <error :form="form" name="password" />
                        </div>

                        <div class="flex flex-vc flex-tj px30 px-lg-15 mb80 mb-lg-40">
                            <div class="flex-box">
                                <div class="check-box">
                                    <input type="checkbox" name="check" id="check">
                                    <label for="check"><span>로그인 상태 유지</span></label>
                                </div>
                            </div>
                            <div class="flex-box">
                                <div class="member-box">
                                    <div class="member-box-link">
                                        <dl>
                                            <dd><nuxt-link to="/users/findId">아이디 찾기</nuxt-link></dd>
                                            <dd><nuxt-link to="/users/findPassword">비밀번호 찾기</nuxt-link></dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="button-box mb32 mb-lg-32">
                            <button type="submit" class="btn btn-active">로그인</button>
                        </div>
                        <div class="member-box">
                            <nuxt-link to="/users/registerChoice" class="member-box-register"><b>아직 회원이 아니신가요?</b></nuxt-link>

                            <div class="member-box-sns mt64 mt-lg-32">
                                <b>간편 로그인</b>
                                <dl>
                                    <dd class="naver"><a :href="`${$store.state.domain}/openLoginPop/naverCustom`">네이버 로그인</a></dd>
                                    <dd class="kakao"><a :href="`${$store.state.domain}/openLoginPop/kakaoCustom`">카카오 로그인</a></dd>
                                    <dd class="google"><a :href="`${$store.state.domain}/openLoginPop/google`">구글 로그인</a></dd>
                                </dl>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
<style>
.space-box {min-height:100vh;}
</style>
<script>
import Form from "../utils/Form";
export default {
    name: 'Login',
    layout: "empty",
    auth: ["guest"],
    data(){
        return {
            form : new Form(this.$axios, {
                email:"",
                password:""
            })
        }
    },
    methods: {
        login(){
            this.$auth.loginWith('laravelSanctum', {
                data: this.form.data()
            }).then(response => {
                // this.$router.push("/");
            }).catch(error => {
                this.form.onFail(error.response.data);
            });

            /*this.$axios.get('/sanctum/csrf-cookie').then(response => {
                this.form.post("/api/login")
                    .then(response => {
                        this.$axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

                        this.$store.commit("setToken", response.data.token);
                        this.$store.commit("setUser", response.data.user);

                        console.log(this.$store.state.user);
                    })
                    .catch(error => {

                    })
            });*/
        },
    },

    mounted() {
        if(this.$auth.user)
            return this.$router.back();
    }
}
</script>
