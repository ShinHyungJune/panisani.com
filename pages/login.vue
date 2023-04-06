<template>
    <main class="login">
        <div class="container col-group">
            <div class="left-wrap row-group">
                <div class="login-wrap">
                    <form @submit.prevent="login" @keydown="() => {form.errors.clear()}">
                        <h2 class="login-title scd6">
                            <span class="scd6">왓픽</span> 회원 로그인
                        </h2>
                        <div class="login-form row-group">
                            <input type="text" placeholder="아이디를 입력해 주세요." v-model="form.email">
                            <p class="m-input-error" v-if="form.errors.has('email')">{{form.errors.get("email")}}</p>

                            <input type="password" placeholder="비밀번호를 입력해 주세요." v-model="form.password">
                            <p class="m-input-error" v-if="form.errors.has('password')">{{form.errors.get("password")}}</p>

                            <button type="submit" class="login-submit scd5">로그인</button>
                            <div class="col-group">
                                <label for="auto_login">
                                    <input type="checkbox" id="auto_login">
                                    <span class="check-icon"></span>
                                    자동로그인
                                </label>
                                <div class="find-account col-group">
                                    <nuxt-link to="/users/findId">아이디 찾기</nuxt-link>
                                    <nuxt-link to="/users/findPassword">비밀번호 찾기</nuxt-link>
                                </div>
                            </div>
                        </div>
                        <div class="sns-login-wrap col-group">
                            <p class="title">
                                <strong>SNS</strong> 계정 로그인
                            </p>
                            <ul class="sns-login-list col-group">
                                <li>
                                    <a :href="`${$store.state.domain}/openLoginPop/naverCustom`">
                                        <img src="/images/sns_login_naver.png" alt="">
                                    </a>
                                </li>
                                <li>
                                    <a :href="`${$store.state.domain}/openLoginPop/kakaoCustom`">
                                        <img src="/images/sns_login_kakao.png" alt="">
                                    </a>
                                </li>
<!--                                <li>
                                    <a :href="`${$store.state.domain}/openLoginPop/google`">
                                        <img src="/images/sns_login_facebook.png" alt="">
                                    </a>
                                </li>
                                <li>
                                    <a :href="`${$store.state.domain}/openLoginPop/facebook`">
                                        <img src="/images/sns_login_google.png" alt="">
                                    </a>
                                </li>-->
                            </ul>
                        </div>
                    </form>
                </div>
                <nuxt-link to="/users/create" class="join-wrap col-group">
                    <div class="txt-box">
                        <h3 class="join-title scd5">아직 회원이 아니신가요?</h3>
                        <p class="title">
                            <span class="red scd5">회원가입</span> 후 다양한 서비스를 만나보세요
                        </p>
                    </div>
                    <i class="xi-arrow-right"></i>
                </nuxt-link>
            </div>
            <div class="right-wrap">
                <div class="txt-box">
                        <span class="notice">
                            <i class="xi-info"></i>
                        </span>
                    <p class="title">
                        왓픽은 중고차 <span class="scd5">구매 도우미</span> 입니다.
                    </p>
                    <p class="txt">
                        왓픽은 중고차를 판매하지 않습니다. 왓픽은 중고차 매물의 진짜 정보를 제공합니다.
                    </p>
                </div>
                <img src="/images/login_bg.png" alt="">
            </div>
        </div>

    </main>
</template>

<script>
import Form from "../utils/Form";
export default {
    name: 'Login',
    auth: "guest",
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
                this.$router.push("/");
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
        }
    }
}
</script>
