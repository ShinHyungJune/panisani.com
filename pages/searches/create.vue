<template>
    <section class="flex">
        <aside class="left-side"></aside>
        <article>
            <div class="container">
                <div class="search-box">
                    <form @submit.prevent="search">
                        <input type="text" placeholder="검색어를 입력해주세요." v-model="form.word">
                        <a href="#" class="delete" @click.prevent="form.word = ''; getSearches();">삭제</a>
                        <button type="submit" class="submit">검색</button>
                    </form>
                    <dl v-if="searches.data.length > 0">
                        <dd v-for="search in searches.data" :key="search.id">
                            <nuxt-link :to="`/boards/show?id=${search.board.id}`">
                                <p v-html="searchTitle(search)"></p>
                                <span>MORE</span>
                            </nuxt-link>
                        </dd>
                    </dl>
                </div>
                <div class="search-list-box mt80 mt-lg-50">
                    <ul>
                        <li>
                            <strong>최근 방문 게시판</strong>
                            <dl>
                                <dd>
                                    <a href="" class="subject">검은사막</a>
                                    <a href="" class="delete">삭제</a>
                                </dd>
                                <dd>
                                    <a href="" class="subject">디아블로2</a>
                                    <a href="" class="delete">삭제</a>
                                </dd>
                                <dd>
                                    <a href="" class="subject">로스트아크</a>
                                    <a href="" class="delete">삭제</a>
                                </dd>
                                <dd>
                                    <a href="" class="subject">검은사막</a>
                                    <a href="" class="delete">삭제</a>
                                </dd>
                                <dd>
                                    <a href="" class="subject">디아블로2</a>
                                    <a href="" class="delete">삭제</a>
                                </dd>
                                <dd>
                                    <a href="" class="subject">로스트아크</a>
                                    <a href="" class="delete">삭제</a>
                                </dd>
                            </dl>
                        </li>
                        <li>
                            <strong>인기 게시판</strong>
                            <dl>
                                <dd>
                                    <a href="" class="subject">검은사막</a>
                                </dd>
                                <dd>
                                    <a href="" class="subject">디아블로2</a>
                                </dd>
                                <dd>
                                    <a href="" class="subject">로스트아크</a>
                                </dd>
                            </dl>
                        </li>
                    </ul>
                </div>
            </div>
        </article>
        <aside class="right-side">
            <div class="ranking-box">
                <div class="ranking-tab">
                    <ul>
                        <li class="active"><a href="">TOP 10</a></li>
                        <li><a href="">TOP 20</a></li>
                    </ul>
                </div>
                <div class="ranking-list">
                    <ul>
                        <li>
                            <a href="">
                                <b>1</b>
                                <p>발렌타인데이</p>
                                <sub class="up">78</sub>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <b>2</b>
                                <p>발렌타인데이</p>
                                <sub class="down">78</sub>
                            </a>
                        </li>
                    </ul>
                </div>
                <time>2023.00.00 04:00 PM</time>
            </div>
            <div class="aside-banner-box">
                <a href=""><img src="/images/img_banner.png"></a>
            </div>
        </aside>
    </section>
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
