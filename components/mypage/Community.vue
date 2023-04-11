<template>
    <li class="list-item toggle-box">
        <div>
            <div class="list-head">
                <div class="flex flex-vc">
                    <div class="flex-box">
                        <div class="subject">
                            <strong>{{community.title}}</strong>
                            <nuxt-link :to="`/communities/show?id=${community.id}`" class="icon-copy">연결</nuxt-link>
                        </div>
                    </div>
                    <div class="flex-box">
                        <div class="button-box">
                            <a href="#" class="btn btn-white btn-sm" @click.prevent="active = !active">관리</a>
                        </div>
                    </div>
                </div>
                <div class="detail">
                    <p>{{ community.description }}</p>
                </div>
            </div>

            <div class="list-body toggle-body" style="display:block;" v-if="active">
                <div class="message-box">
                    <p class="tc fw4">설정한 순서대로 게시판이 노출됩니다. <br class="is-m"><b class="f16">(최대 공개 게시판 개수 8개)</b></p>
                </div>
                <form>
                    <div class="setting-list-box mt24 mt-lg-15">
                        <ul class="list" @keyup="() => form.errors.clear()">
                            <board :board="board" v-for="(board, index) in boards.data" :key="board.id" @up="up(board,index)" @down="down(board,index)" />
                            <li class="list-item add">
                                <div class="setting-head">
                                    <input type="text" placeholder="게시판명을 작성해주세요." v-model="form.title">
                                    <div class="button-box">
                                        <a href="#" class="btn btn-white btn-sm" @click.prevent="storePost">추가</a>
                                    </div>
                                </div>
                            </li>
                            <error :form="form" name="title"/>
                        </ul>
                    </div>
                </form>
                <!--
                <div class="button-box mt56 mt-lg-28">
                    <div class="col-12 flex flex-vc flex-tc mb24 mb-lg-15">
                        <a href="#" class="btn btn-white btn-sm icon-plus w115">게시판 추가</a>
                    </div>
                    <a href="" class="btn btn-active">변경사항 저장</a>
                </div>
                -->
            </div>
        </div>
    </li>

</template>
<style>

</style>
<script>
import Form from "~/utils/Form";
import Board from "@/components/mypage/Board";
export default {
    props: ["community"],

    components: {Board},

    data(){
        return {
            form: new Form(this.$axios, {
                mine: 1,
                title:"",
                page:1,
                community_id: this.community.id,
            }),

            active: false,

            boards: {
                data: [],
            }
        }
    },

    computed: {

    },

    methods: {

        up(item, index){
            if(index > 0){
                let temp = null;

                temp = this.boards.data.splice(index, 1)[0];

                this.boards.data.splice(index - 1,0, temp);

                this.form.patch("/api/boards/" + item.id + "/up")
                    .then(response => {

                    });
            }
        },

        down(item, index){
            if(index < this.boards.data.length){
                let temp = null;

                temp = this.boards.data.splice(index, 1)[0];

                this.boards.data.splice(index + 1,0, temp);

                this.form.patch("/api/boards/" + item.id + "/down")
                    .then(response => {

                    });
            }
        },

        getBoards(loadMore = false){
            if(loadMore)
                this.form.page += 1;

            this.$axios.get("/api/boards", {
                params: this.form
            }).then(response => {
                if(loadMore)
                    return this.boards = {
                        ...response.data,
                        data: [...this.boards.data, ...response.data.data]
                    };

                return this.boards = response.data;
            })
        },

        storePost(){
            this.form.post("/api/boards")
                .then(response => {
                    response.data.open = 1;

                    this.boards.data.push(response.data);
                })
        }
    },

    mounted() {
        this.getBoards();
    }

}
</script>
