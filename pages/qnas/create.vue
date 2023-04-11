<template>
    <article>
        <div class="container lg">
            <div class="cate-tab-box">
                <ul>
                    <li class="">
                        <nuxt-link to="/notices">공지사항</nuxt-link>
                    </li>
                    <li class="active"><nuxt-link to="/qnas/create">고객의 소리</nuxt-link></li>
                    <li><nuxt-link to="/suggestions/create">제휴 문의</nuxt-link></li>
                </ul>
            </div>
            <div class="board-list-box">
                <div class="form-box">
                    <div class="title-box mt40 mt-lg-20">
                        <h2 class="tl">파니사니는 항상<br>유저에게 열려있습니다.</h2>
                        <p class="tl mt24 mt-lg-12">
                            파니사니를 이용하면서<br>
                            느끼신 불편사항이나 바라는 점을 알려주세요.<br><br>

                            문의량이 많아 답변은 24시간 이상 소요될 수 있습니다.
                        </p>
                    </div>
                    <div class="textarea-box gr mt36 mt-lg-20">
                        <div class="box">
							<textarea v-model="form.description" placeholder="의견을 남겨주세요&#13;&#10;
문의 내용에 대한 답변은 가입당시 입력하신 이메일에서
확인 가능합니다.

내용 본문과 이미지에 고객님의 개인정보(주민번호 등)가
포함되지 않도록 주의해주세요."></textarea>
<!--                            <sub class="tr">0/500</sub>-->
                        </div>
                    </div>

                    <div class="mt20"></div>

                    <input-resize-imgs @change="data => form.files = data" />

                    <div class="mt100 mt-lg-50">
                        <div class="message-box">
                            <p class="f18 tc">이미지 내 개인정보가 포함되지 않도록 주의해주세요. <br class="is-m">(주민번호, 전화번호 등)</p>
                        </div>
                        <div class="button-box mx-box mt24 mt-lg-15">
                            <a href="#" class="btn btn-active" @click.prevent="store">보내기</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>

</template>
<script>
import Form from "~/utils/Form";
export default {
    middleware: ["auth"],
    data(){
        return {
            form: new Form(this.$axios, {
                description: "",
                files: []
            }),

            notices: {
                data: [],
                links: {}
            }
        }
    },

    methods:{
        store(){
            this.form.post("/api/qnas")
                .then(response => {
                    this.$store.commit("setPop", {
                        title: "문의접수",
                        description: "성공적으로 처리되었습니다!"
                    });

                    this.$router.push("/");
                });
        },

    },

    computed: {

    },

    mounted(){

    }
}
</script>
