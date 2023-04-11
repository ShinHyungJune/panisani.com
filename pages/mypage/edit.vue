<template>
    <article>
        <div class="container lg">
            <profile :defaultUser="$auth.user.data" />

            <mypage-gnbs />

            <div class="title-form-box mt48 mt-lg-24">
                <strong>내 정보</strong>
<!--                <div class="button-box">
                    <a href="javascript:;" onclick="modalOpen('update');" class="btn btn-white btn-sm px22 px-lg-10">수정</a>
                </div>-->
            </div>
            <div class="form-group-box mt15">
                <div class="form-group">
                    <strong>이메일</strong>
                    <div class="input-box md disabled">
                        <div class="box">
                            <input type="text" :value="$auth.user.data.email" disabled>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <strong>생년월일</strong>
                    <div class="input-box md disabled">
                        <div class="box">
                            <input type="text" :value="$auth.user.data.birth" disabled>
                        </div>
                    </div>
                </div>
<!--                <div class="form-group">
                    <strong>연락처</strong>
                    <div class="input-box md disabled">
                        <div class="box">
                            <input type="text" value="010-2***-0***">
                        </div>
                    </div>
                </div>-->
                <div class="form-group">
                    <strong>비밀번호</strong>
                    <div class="button-box">
                        <a href="#" class="btn btn-white btn-md" @click.prevent="activePasswordPop = true">비밀번호 변경</a>
                    </div>
                </div>
            </div>
            <div class="button-box mt48 mt-30">
                <a href="#" class="btn btn-white btn-md" @click.prevent="$auth.logout()">로그아웃</a>
            </div>
            <div class="mt58 mt-lg-30">
                <div class="message-box">
                    <p><nuxt-link to="/users/remove" class="underline">계정탈퇴</nuxt-link>탈퇴 후 복구할 수 없습니다. 신중히 결정해주세요.</p>
                </div>
            </div>

            <div class="modal-box fixed" v-if="activePasswordPop">
                <div class="box" data-name="update">
                    <h2>비밀번호 변경</h2>
                    <form class="px20 px-lg-0 mt34 mt-lg-17">
                        <div class="input-box mb56 mb-lg-28">
                            <div class="box">
                                <input type="password" placeholder="현재 비밀번호를 작성해주세요." v-model="form.password">
                            </div>

                            <error :form="form" name="password" />

                        </div>
                        <div class="input-box mb16 mb-lg-10">
                            <div class="box">
                                <input type="password" placeholder="새로운 비밀번호를 작성해주세요. 입력해주세요." v-model="form.password_new">
                            </div>

                            <error :form="form" name="password_new" />
                        </div>
                        <div class="input-box">
                            <div class="box">
                                <input type="password" placeholder="새로운 비밀번호를 확인해주세요." v-model="form.password_new_confirmation">
                            </div>
                            <div class="message-box mt10 px30 px-lg-15">
                                <p class="tl">8자 이상 문자와 숫자를 섞어서 입력해주세요.<br>단  ‘!, @, #, $, %, ^, &amp;, * ‘이 외의 특수문자는 사용할 수 없습니다. </p>
                            </div>
                            <error :form="form" name="password_new_confirmation" />
                        </div>
                        <div>
                            <div class="button-box mt56 mt-lg-28">
                                <div class="col-6 pr6">
                                    <a href="#" class="btn btn-bd-active btn-md" @click="activePasswordPop = false">취소</a>
                                </div>
                                <div class="col-6 pl6">
                                    <a href="#" class="btn btn-active btn-md" @click.prevent="update">완료</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
import Form from "../../utils/Form";
export default {
    middleware: ['auth'],

    data(){
        return {
            activePasswordPop : false,

            form : new Form(this.$axios, {
                password: "",
                password_new: "",
                password_new_confirmation: "",
            }),
        }
    },
    methods: {
        update(){
            this.form.patch("/api/users")
                .then(response => {
                    this.$store.commit("setPop", {
                        title: "변경완료",
                        description: "성공적으로 처리되었습니다!"
                    });

                    this.activePasswordPop = false;
                })
        },
    },

    computed: {

    },

    mounted() {

    }
}
</script>
