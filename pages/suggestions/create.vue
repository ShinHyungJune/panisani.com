<template>
    <article>
        <div class="container lg">
            <div class="cate-tab-box">
                <ul>
                    <li class="">
                        <nuxt-link to="/notices">공지사항</nuxt-link>
                    </li>
                    <li class=""><nuxt-link to="/qnas/create">고객의 소리</nuxt-link></li>
                    <li class="active"><nuxt-link to="/suggestions/create">제휴 문의</nuxt-link></li>
                </ul>
            </div>
            <div class="board-list-box">
                <div class="form-box">
                    <div class="title-box mt40 mt-lg-20">
                        <h2 class="tl">파니사니 제휴문의</h2>
                        <p class="tl mt24 mt-lg-12">
                            · 각종 NFT게임 및 업계, 유행하는 게임 문화를 전달하는 게임 웹진<br>
                            · 온라인, 모바일, 콘솔 게임 등 커뮤니티 운영<br><br>

                            문의량이 많아 답변은 24시간 이상 소요될 수 있습니다.
                        </p>
                    </div>
                    <div class="textarea-box gr mt36 mt-lg-20">
                        <div class="box">
                            <textarea placeholder="제휴문의 내용을 입력해주세요" v-model="form.description"></textarea>
<!--                            <sub class="tr">0/1000</sub>-->
                        </div>
                    </div>
                    <div class="file-box mt64 mt-lg-32">
                        <div class="box">
                            <input-files @change="data => form.files = data" />
                        </div>
                        <div class="message-box mt24 mt-lg-12">
                            <p>
                                제안 주시는 상품 및 귀사 관련하여 추가적으로 공유주실<br>
                                사진 등의 자료(최대 3개)가 있으시다면 업로드 부탁드립니다.<br><br>
                                파일당 500mb 까지 지원합니다.
                            </p>
                        </div>
                    </div>
                    <div class="mt80 mt-lg-40">
                        <div class="button-box mx-box mt24 mt-lg-15">
                            <a href="" class="btn btn-active" @click.prevent="store">보내기</a>
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
            this.form.post("/api/suggestions")
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
