<template>


    <div class="m-input-wrap type01" @keydown="() => {form.errors.clear()}">
        <div class="m-input-withBtn type02" v-if="mode === 'beforeSend'">
            <div class="m-input m-input-text type01">
                <input type="text" v-model="form.contact" @keyup="clearLetter" placeholder="- 없이 숫자만">
            </div>

            <button type="button" class="m-input-btn" @click="store">인증번호발송</button>
        </div>

        <p class="m-input-error" v-if="form.errors.has('contact')">{{form.errors.get("contact")}}</p>

        <div class="m-input-withBtn type02" v-if="mode === 'afterSend'">
            <div class="m-input m-input-text type01">
                <input type="text" v-model="form.number" @keyup="clearLetter" placeholder="인증번호">
            </div>

            <button type="button" class="m-input-btn" @click="update">인증하기</button>
        </div>
        <p class="m-input-error" v-if="form.errors.has('number')">{{form.errors.get("number")}}</p>

        <div class="m-input-withBtn type02" v-if="mode === 'verified'">
            <div class="m-input m-input-text type01">
                <input type="text" v-model="form.contact" disabled>
            </div>
        </div>
    </div>

</template>
<style>

    .m-input-withBtn.type02 {
        display:flex;
    }
    .m-input-text.type01 input {
        display: block;
        width: 100%;
        height: 56px;
        background: #fff;
        padding: 0 24px;
        font-size: 18px;
        border:1px solid #e1e1e1;
    }
    .m-input-withBtn.type02 .m-input-text {
        flex:auto; margin-right:16px;
    }
    .m-input-withBtn.type02 .m-input-btn {
        width: 120px;
        height: 56px;
        font-size: 14px;
        font-weight: bold;
        border: 1px solid #c7c7c7;
        transition: .3s;
        text-align: center;
    }
</style>
<script>
import Form from '../utils/Form';
export default {
    props: {
        url: {
            default: "/api/verifyNumbers"
        }
    },

    data(){
        return {
            form: new Form(this.$axios, {
                contact: "",
                number: ""
            }),

            mode: "beforeSend",
        }
    },

    methods: {
        store(){
            this.form.post(this.url).then((response) => {
                this.mode = "afterSend";
            }).catch(error => {
                if(error.message && error.message.includes("invalid"))
                    return alert("입력값을 확인해주세요.");

                if(error.message)
                    return alert(error.message);
            });
        },

        update(){
            this.form.patch(this.url).then(response => {
                this.$emit("verified", this.form.contact);

                alert("성공적으로 인증되었습니다.");

                this.mode = "verified";
            }).catch(error => {
                if(error.message && error.message.includes("invalid"))
                    return alert("입력값을 확인해주세요.");

                if(error.message)
                    return alert(error.message);
            })
        },

        clearLetter(){
            this.form.contact = this.form.contact.replace(/-/g, '');
        },
    }
}
</script>
