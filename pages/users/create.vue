<template>
    <section class="space-box center">
        <div class="space-box-inner">
            <div class="container">
                <div class="title-box mb40">
                    <img src="/images/img_page_logo.png" class="logo sm">
                </div>
                <div class="reg-order-box">
                    <ul>
<!--                        <li class="order-01 active"><p><b>1. 본인 인증</b></p></li>-->
                        <li class="order-01 active on"><p><b>1. 정보 입력</b></p></li>
                        <li class="order-02"><p><b>2. 가입 완료</b></p></li>
                    </ul>
                </div>
                <div class="form-box mt80 mt-lg-40">
                    <form>
                        <input-avatar @change="data => form.img = data" />

                        <error :form="form" name="img" />

                        <input-verify-number @verified="(data) => {form.email = data}" :isRegister="1" />

                        <div class="input-box mb32 mb-lg-16">
                            <div class="box">
                                <input type="text" placeholder="닉네임을 작성해주세요." v-model="form.nickname">
<!--                                <div class="box-inner">
                                    <div class="button-box">
                                        <a href="" class="btn btn-active btn-sm px16 px-lg-8">중복확인</a>
                                    </div>
                                </div>-->
                            </div>
                            <error :form="form" name="nickname" />

                            <div class="message-box mt10">
                                <div class="flex flex-vc">
                                    <a href="" class="rule mr8">규정확인</a>
                                    <p class="flex-1">욕설, 불건전 닉네임 등 불량 닉네임은 임의 삭제 혹은 계정 징계 조치됩니다.</p>
                                </div>
                            </div>
                        </div>
                        <div class="input-box mb16">
                            <div class="box">
                                <input type="password" placeholder="새로운 비밀번호를 작성해주세요. 입력해주세요." v-model="form.password">
<!--                                <div class="box-inner">
                                    <div class="message-box">
                                        <p class="available">사용가능</p>
                                    </div>
                                </div>-->
                            </div>
                        </div>
                        <div class="input-box mb56 mb-28">
                            <div class="box">
                                <input type="password" placeholder="비밀번호를 확인해주세요." v-model="form.password_confirmation">
<!--                                <div class="box-inner">
                                    <div class="message-box">
                                        <p class="unavailable">사용불가</p>
                                    </div>
                                </div>-->
                            </div>
                            <div class="message-box mt10 px30 px-lg-15">
                                <p>8자 이상 문자와 숫자를 섞어서 입력해주세요.<br>단  ‘!, @, #, $, %, ^, &, * ‘이 외의 특수문자는 사용할 수 없습니다. </p>
                            </div>
                            <error :form="form" name="password" />
                            <error :form="form" name="password_confirmation" />
                        </div>
                        <div class="input-box mb16">
                            <div class="title-form-box">
                                <strong>생년월일</strong>
                            </div>

                            <div class="box">
                                <input type="date" v-model="form.birth">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="message-box bt">
                    <p>
                        파니사니는 계정 관련 정보가 포함된 문자 메시지를 보내거나<br>
                        통화할 목적으로 유저의 전화번호를 이용할 수 있습니다.<br>
                        회원가입을 클릭하면 파니사니의 에 동의하고 개인정보 처리방침 적용을 인정하는 것으로 간주합니다
                    </p>
                </div>
                <div class="button-box mt32 mt-lg-16">
                    <a href="#" class="btn btn-active" @click.prevent="store">동의하고 회원가입</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Form from "../../utils/Form";
export default {
    name: 'Register',
    layout: "empty",
    data(){
        return {
            socialUser: null,
            form : new Form(this.$axios, {
                img: "", // 아바타 이미지
                social_id: "", // 소셜토큰
                social_platform: "", // 소셜플랫폼

                password:"",
                password_confirmation:"",

                // name: this.$route.query.name ? this.$route.query.name : "",
                // sex: this.$route.query.sex ? this.$route.query.sex : "공개안함",
                birth : this.$route.query.birth ? this.$route.query.birth : "",
                // contact: this.$route.query.contact ? this.$route.query.contact : "",
                email: this.$route.query.email ? this.$route.query.email : "",
                nickname: this.$route.query.nickname ? this.$route.query.nickname : "",

                number: "",
            }),
        }
    },
    methods: {
        store(){
            this.form.post("/api/users")
                .then(response => {
                    this.$router.push("/users/successCreate");
                });
        },
    },

    computed: {

    },

    mounted() {
        if(this.$route.query.socialUser)
            this.socialUser = JSON.parse(this.$route.query.socialUser);

        if(this.socialUser){
            if(this.socialUser.social_id)
                this.form.social_id = this.socialUser.social_id;

            if(this.socialUser.social_platform)
                this.form.social_platform = this.socialUser.social_platform;

            if(this.socialUser.name)
                this.form.name = this.socialUser.name;

            if(this.socialUser.email)
                this.form.email = this.socialUser.email;

            if(this.socialUser.sex)
                this.form.sex = this.socialUser.sex;

            if(this.socialUser.birth)
                this.form.birth = this.socialUser.birth;

            if(this.socialUser.contact)
                this.form.contact = this.socialUser.contact;
        }
    }
}
</script>
