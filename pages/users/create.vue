<template>
    <main class="subpage join form">
        <div class="container">
            <form @submit.prevent="store">
                <div class="form-title col-group">
                        <span class="icon">
                            <i class="xi-user"></i>
                        </span>
                    <p class="scd5">회원가입</p>
                </div>
                <div class="form-wrap">
                    <ul class="form-box row-group">
                        <li class="col-group">
                            <div class="default">
                                이름
                                <span class="red">*</span>
                            </div>
                            <div class="user">
                                <input type="text" v-if="socialUser && socialUser.name" disabled v-model="form.name">
                                <input type="text" v-else v-model="form.name">
                                <p class="guide wrong" v-if="form.errors.has('name')">
                                    {{ form.errors.get("name") }}
                                </p>
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                연락처
                                <span class="red">*</span>
                            </div>
                            <div class="user">
                                <input type="text" v-if="socialUser && socialUser.contact" disabled v-model="form.contact">

                                <input-verify-number v-else @verified="(data) => {form.contact = data}"/>

                                <p class="guide wrong" v-if="form.errors.has('contact')">
                                    {{ form.errors.get("contact") }}
                                </p>
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                출생년도
                                <span class="red">*</span>
                            </div>
                            <div class="user">
                                <input type="number" v-if="socialUser && socialUser.birth" disabled v-model="form.birth">
                                <input type="number" v-else v-model="form.birth" placeholder="출생년도 4자리">
                                <p class="guide wrong" v-if="form.errors.has('birth')">
                                    {{ form.errors.get("birth") }}
                                </p>
                            </div>
                        </li>
                    </ul>
                    <ul class="form-box row-group">
                        <li class="col-group" v-if="!socialUser">
                            <div class="default">
                                아이디
                                <span class="red">*</span>
                            </div>
                            <div class="user col-group">
                                <input type="text" v-model="form.ids">
                                <p class="guide wrong" v-if="form.errors.has('ids')">
                                    {{ form.errors.get("ids") }}
                                </p>
                            </div>
                        </li>
                        <li class="col-group" v-if="!socialUser">
                            <div class="default">
                                비밀번호
                                <span class="red">*</span>
                            </div>
                            <div class="user">
                                <input type="password" v-model="form.password">
                            </div>
                        </li>
                        <li class="col-group" v-if="!socialUser">
                            <div class="default">
                                비밀번호 확인
                                <span class="red">*</span>
                            </div>
                            <div class="user">
                                <input type="password" v-model="form.password_confirmation">
                                <p class="guide">
                                    영문 대문자와 소문자, 숫자, 특수문자 중 2가지 이상을 조합하여 6~20자로 입력해주세요
                                </p>
                                <p class="guide wrong" v-if="form.errors.has('password')">
                                    {{ form.errors.get("password") }}
                                </p>
                                <p class="guide wrong" v-if="form.errors.has('password_confirmation')">
                                    {{ form.errors.get("password_confirmation") }}
                                </p>
                            </div>
                        </li>
                        <li class="col-group gender">
                            <div class="default">
                                성별
                                <span class="red">*</span>
                            </div>
                            <div class="user col-group">
                                <label for="gender_1">
                                    <input type="radio" id="gender_1" name="gender" value="남자" v-model="form.sex">
                                    <span class="radio-icon"></span>
                                    남자
                                </label>
                                <label for="gender_2">
                                    <input type="radio" id="gender_2" name="gender" value="여자" v-model="form.sex">
                                    <span class="radio-icon"></span>
                                    여자
                                </label>
                                <label for="gender_3">
                                    <input type="radio" id="gender_3" name="gender" value="공개안함" v-model="form.sex">
                                    <span class="radio-icon"></span>
                                    공개안함
                                </label>

                                <p class="guide wrong" v-if="form.errors.has('sex')">
                                    {{ form.errors.get("sex") }}
                                </p>
                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                이메일
                                <span class="red">*</span>
                            </div>
                            <div class="user">
                                <input type="email" v-model="form.email">

                                <p class="guide wrong" v-if="form.errors.has('email')">
                                    {{ form.errors.get("email") }}
                                </p>
                            </div>
                        </li>
                        <li class="col-group addr">
                            <div class="default">
                                주소
                            </div>
                            <div class="user row-group">
                                <input-address @change="(data) => form[data.name] = data.value" :form="form" />

                                <p class="guide wrong" v-if="form.errors.has('address')">
                                    {{ form.errors.get("address") }}
                                </p>
                                <p class="guide wrong" v-if="form.errors.has('address_detail')">
                                    {{ form.errors.get("address_detail") }}
                                </p>
                                <p class="guide wrong" v-if="form.errors.has('address_zipcode')">
                                    {{ form.errors.get("address_zipcode") }}
                                </p>

                            </div>
                        </li>
                        <li class="col-group">
                            <div class="default">
                                추천인
                            </div>
                            <div class="user">
                                <input type="text" v-model="form.ids_recommend">
                                <p class="guide wrong" v-if="form.errors.has('ids_recommend')">
                                    {{ form.errors.get("ids_recommend") }}
                                </p>
                                <p class="guide">
                                    회원가입 시 4000 POINT를 제공하며, 추천인 등록 시 추가로 1000 POINT를 지급합니다.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="form-footer">
                    <div class="agree-title col-group">
                        <p class="title scd5">약관동의</p>
                        <p class="txt col-group">
                            회원 이용약관
                            <a href="" class="scd5">보기</a>
                        </p>
                        <p class="txt col-group">
                            개인정보수집
                            <a href="" class="scd5">보기</a>
                        </p>
                    </div>
                    <div class="agree-wrap col-group">
                        <div class="agree-box col-group">
                            <label for="agree_1">
                                <input type="checkbox" id="agree_1" name="agree_list" v-model="form.agree_usage">
                                <span class="check-icon"></span>
                                이용약관 동의(필수)
                            </label>
                            <label for="agree_2">
                                <input type="checkbox" id="agree_2" name="agree_list" v-model="form.agree_privacy">
                                <span class="check-icon"></span>
                                개인정보수집 동의 (필수)
                            </label>
                            <label for="agree_3">
                                <input type="checkbox" id="agree_3" name="agree_list" v-model="form.agree_marketing">
                                <span class="check-icon"></span>
                                마케팅 정보 수신 (선택)
                            </label>
                        </div>
                        <label for="" @click.prevent="() => {isAgreeAll ? disagreeAll() : agreeAll()}">
                            <input type="checkbox" id="" checked v-if="isAgreeAll" disabled @click="disagreeAll">
                            <input type="checkbox" id="" v-else disabled>
                            <span class="check-icon"></span>
                            전체 동의
                        </label>
                    </div>
                </div>
                <button type="submit" class="form-submit">가입하기</button>
            </form>
        </div>
    </main>
</template>

<script>
import Form from "../../utils/Form";
export default {
    name: 'Login',
    data(){
        return {
            socialUser: null,
            form : new Form(this.$axios, {
                social_id: "", // 소셜토큰
                social_platform: "", // 소셜플랫폼

                ids:"",
                password:"",
                password_confirmation:"",
                name: this.$route.query.name ? this.$route.query.name : "",
                sex: this.$route.query.sex ? this.$route.query.sex : "공개안함",
                birth : this.$route.query.birth ? this.$route.query.birth : "",
                contact: this.$route.query.contact ? this.$route.query.contact : "",
                email: this.$route.query.email ? this.$route.query.email : "",
                address: "",
                address_detail: "",
                address_zipcode: "",
                ids_recommend: "",
                agree_marketing: 0,
                agree_privacy : 0,
                agree_usage: 0,
            }),
        }
    },
    methods: {
        store(){
            this.form.post("/api/users")
                .then(response => {
                    this.$router.push("/users/successCreate");
                }).catch(error => {
                    if(error.message && error.message.includes("invalid"))
                        return alert("입력값을 확인해주세요.");
            })
        },

        agreeAll(){
            this.form.agree_marketing = 1;
            this.form.agree_privacy = 1;
            this.form.agree_usage = 1;
        },

        disagreeAll(){
            this.form.agree_marketing = 0;
            this.form.agree_privacy = 0;
            this.form.agree_usage = 0;
        },

    },

    computed: {
        isAgreeAll(){
            return this.form.agree_marketing && this.form.agree_privacy && this.form.agree_usage;
        }
    },

    mounted() {
        if(this.$route.query.socialUser)
            this.socialUser = JSON.parse(this.$route.query.socialUser);

        if(this.socialUser){
            console.log(this.socialUser);

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
