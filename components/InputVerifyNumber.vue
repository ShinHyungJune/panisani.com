<template>
    <div @keyup="() => {form.errors.clear()}">
        <div class="input-box mb16 mb-lg-10 mt20" v-if="mode === 'beforeSend'">
            <div class="box">
                <input type="text" placeholder="이메일 아이디를 작성해주세요." v-model="form.email">
                <div class="box-inner">
                    <div class="button-box">
                        <a href="#" class="btn btn-active btn-sm px16 px-lg-8" @click.prevent="sendVerify">인증하기</a>
                    </div>
                </div>
            </div>

            <error :form="form" name="email" />
        </div>

        <div class="input-box mb-lg-10" v-if="mode === 'afterSend'">
            <div class="box">
                <input type="text" placeholder="인증번호" v-model="form.number">
                <div class="box-inner">
                    <div class="button-box">
                        <a href="#" class="btn btn-active btn-sm px16 px-lg-8" @click.prevent="verify">인증하기</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="input-box mb16 mb-lg-10" v-if="mode === 'verified'">
            <div class="box">
                <input type="text" placeholder="이메일 아이디를 작성해주세요." v-model="form.email" disabled>
            </div>

            <error :form="form" name="email" />
            <!--                            <div class="message-box mt10 px30 px-lg-15">
                                            <p>숫자와 특수기호(_),( )만 사용 가능합니다.</p>
                                        </div>-->
        </div>
    </div>

</template>

<script>
import Form from '../utils/Form';
export default {
    props: {
        url: {
            default: "/api/verifyNumbers"
        },
        isRegister: {
            default: 0,
        },
        findId: {
            default: 0,
        }
    },

    data(){
        return {
            form: new Form(this.$axios, {
                email: "",
                number: "",
                isRegister: this.isRegister,
                findId: this.findId,
            }),

            mode: "beforeSend",
        }
    },

    methods: {
        sendVerify(){
            this.form.post("/api/verifyNumbers")
                .then(response => {
                    this.mode = "afterSend";

                    this.$store.commit("setPop", {
                        title: "발송완료",
                        description: "인증번호가 성공적으로 발송되었습니다!"
                    });
                });
        },

        verify(){
            this.form.patch("/api/verifyNumbers")
                .then(response => {
                    this.mode = "verified";

                    this.$emit("verified", this.form.email);

                    this.$store.commit("setPop", {
                        title: "인증번호",
                        description: "인증이 완료되었습니다!"
                    });
                });
        }
    }
}
</script>
