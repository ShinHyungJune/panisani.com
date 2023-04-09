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

                    <input-editor @change="(data) => form.description = data" :default="defaultValue"/>

                    <error :form="form" name="description" />
                </div>

                <div class="bottom">
                    <div class="left">
                        <input-select :options="boardOptions" placeholder="게시판 선택" :default="form.board_id" @change="(data) => form.board_id=data" v-if="boardOptions.length > 0"/>
                    </div>
                    <div class="button-box">
                        <div class="btn-wrap">
                            <button type="button" class="btn btn-bd-active" @click="storeTempPost">임시저장</button>
                        </div>
                        <div class="btn-wrap">
                            <button type="button" class="btn btn-bd-active" @click="active = true;">임시저장 불러오기</button>
                        </div>
                        <div class="btn-wrap">
                            <button class="btn btn-active">등록</button>
                        </div>
                    </div>
                </div>
            </form>

            <control-pop title="임시저장 불러오기" @confirm="loadTempPost" v-if="active">
                <input-select :options="tempPostOptions" placeholder="임시저장글 선택" v-if="tempPostOptions.length > 0" @change="data => this.selected_temp_post_id = data"/>
            </control-pop>
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
            }),

            active: false,

            tempPosts: {
                data: [],
            },
            boards: {
                data: []
            },

            selected_temp_post_id : null,
            defaultValue: "",
        }
    },

    methods:{
        store(){
            this.form.post("/api/posts")
                .then(response => {
                    this.$store.commit("setPop", {
                        title: "성공적으로 처리되었습니다!"
                    });

                    this.$router.back();
                });
        },

        storeTempPost(){
            this.form.post("/api/tempPosts")
                .then(response => {
                    this.$store.commit("setPop", {
                        title: "성공적으로 처리되었습니다!"
                    });

                    this.tempPosts.data.push(response.data);
                });
        },

        loadTempPost(){
            let tempPost = this.tempPosts.data.find(tempPost => tempPost.id == this.selected_temp_post_id);

            this.active = false;

            if(tempPost){
                this.defaultValue = tempPost.description;
                this.form.title = tempPost.title;
                this.form.description = tempPost.description;
                this.form.board_id = tempPost.board_id;
            }
        },

        getBoards(){
            this.$axios.get("/api/boards", {
                params: {
                    community_id: this.$route.query.community_id
                }
            }).then(response => {
                this.boards = response.data;
            })
        },

        getTempPosts(){
            this.$axios.get("/api/tempPosts").then(response => {
                this.tempPosts = response.data;
            })
        },
    },

    computed: {
        tempPostOptions(){
            return this.tempPosts.data.map(tempPost => {
                return {
                    label: tempPost.title,
                    value: tempPost.id,
                }
            })
        },
        boardOptions(){
            return this.boards.data.map(board => {
                return {
                    label : board.title,
                    value: board.id
                }
            })
        }
    },

    mounted(){
        this.getBoards();
        this.getTempPosts();
    }
}
</script>
