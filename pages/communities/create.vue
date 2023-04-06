<template>
    <article>
        <div class="container">
            <form @submit.prevent="store">
                <div class="input-box gr mb56 mb-lg-28">
                    <div class="title-form-box">
                        <strong>게임 이름</strong>
                        <div class="flex flex-vc flex-tr">
                            <nuxt-link to="/communities" class="more">커뮤니티 전체보기</nuxt-link>
                        </div>
                    </div>
                    <div class="box">
                        <input type="text" placeholder="커뮤니티 이름으로 사용될 게임이름을 입력해주세요." v-model="form.title" />
                    </div>
                    <error :form="form" name="title" />
                </div>
                <div class="mb56 mb-lg-28">
                    <div class="title-form-box">
                        <strong>게임 로고 이미지</strong>
                        <div class="flex flex-vc flex-tr">
                            <div class="message-box mr12">
                                <p>최대 및 권장 크기 250px X 130px (jpg, jpeg, png파일 지원)</p>
                            </div>
                        </div>
                    </div>
                    <div class="box">
                        <input-resize-imgs :multiple="false" @change="files => {form.img = files[0]}" />
                    </div>
                </div>
                <div class="input-box gr mb56 mb-lg-28">
                    <div class="title-form-box">
                        <strong>게임 공식 홈페이지</strong>
                    </div>
                    <div class="box">
                        <input type="text" placeholder="게임 공식 홈페이지 url 입력" v-model="form.url" />
                    </div>
                    <error :form="form" name="url" />
                </div>
                <div class="textarea-box mb72 mb-lg-36">
                    <div class="title-form-box">
                        <strong>게임 설명</strong>
                    </div>
                    <div class="box mb12">
                        <textarea placeholder="게시판 설명 (게임 기종 등 정보)" v-model="form.description"></textarea>
                        <!-- <sub>0/100</sub> -->
                    </div>
                    <error :form="form" name="description" />

                    <div class="check-box px30 px-lg-15">
                        <input type="checkbox" name="check" id="check" v-model="form.has_admin">
                        <label for="check"><span>관리자 권한 신청하기</span></label>
                    </div>
                </div>
                <div class="message-box bt">
                    <p>
                        게시판 신청 요청시 관리자 권한이 주어집니다.<br>
                        게시판 신청 검토에 최대 1주일 소요 될 수 있습니다. 신청결과는 가입시 입력하신 메일로 알려드립니다.
                    </p>
                </div>
                <div class="button-box mt32 mt-lg-16">
                    <button class="btn btn-active">신청하기</button>
                </div>
            </form>
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
                title: "",
                description: "",
                url : "",
                has_admin: 1,
                img: ""
            }),
        }
    },

    methods:{

        store(){
            this.form.post("/api/communities")
                .then(response => {
                    this.$store.commit("setPop", {
                        description: "성공적으로 처리되었습니다!"
                    });

                    this.$router.back();
                });
        }
    },

    computed: {

    },

    mounted(){
    }
}
</script>
