<template>
    <article class="posts-create">
        <div class="container">
            <form @submit.prevent="store">
                <div class="input-box gr mb56 mb-lg-28">
                    <div class="title-form-box">
                        <strong>게시글 제목</strong>
                    </div>
                    <div class="box">
                        <input type="text" placeholder="제목을 입력해주세요." v-model="form.title" />
                    </div>
                    <error :form="form" name="title" />
                </div>

                <div class="textarea-box mb72 mb-lg-36">
                    <div class="title-form-box">
                        <strong>게시글 내용</strong>
                    </div>

                    <input-editor @change="(data) => form.description = data" default=""/>

                    <error :form="form" name="description" />
                </div>

                <div class="bottom">
                    <div class="left">
                        <input-select :options="boardOptions" placeholder="게시판 선택" :default="form.board_id" v-if="boardOptions.length > 0"/>
                    </div>
                    <div class="button-box">
                        <div class="btn-wrap">
                            <button type="button" class="btn btn-bd-active">임시저장</button>
                        </div>
                        <div class="btn-wrap">
                            <button type="button" class="btn btn-bd-active">임시저장 불러오기</button>
                        </div>
                        <div class="btn-wrap">
                            <button class="btn btn-active">등록</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </article>
</template>
<style>

</style>
<script>
import Form from "~/utils/Form";
export default {
    middleware: ["auth"],
    data(){
        return {
            form: new Form(this.$axios, {
                board_id: this.$route.query.board_id,
                title: "",
                description: "",
                url : "",
                has_admin: 1,
                img: ""
            }),

            boardOptions: [],
        }
    },

    methods:{
        store(){
            this.form.post("/api/posts")
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
        this.$axios.get("/api/boards", {
            params: {
                community_id: this.$route.query.community_id
            }
        }).then(response => {
            this.boardOptions = response.data.data.map(board => {
                return {
                    label : board.title,
                    value: board.id
                }
            })
        })
    }
}
</script>
