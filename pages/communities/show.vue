<template>
    <article v-if="community">
        <div class="wrapper">
            <div class="cate-box">
                <ul>
                    <li v-for="board in boards.data" :key="board.id" :class="postForm.board_id == board.id ? 'active' : ''">
                        <a href="#" @click.prevent="()=>{postForm.board_id = board.id; getPosts(); getLatestPosts();}">{{ board.title }}</a>
                    </li>
                </ul>
            </div>
            <div class="title-box">
                <h2>{{ community.title }}</h2>
            </div>
            <div class="board-title-box mt32 mt-lg-25">
                <strong>BEST</strong>
                <div class="cate-tab-box bd0">
                    <ul>
                        <li :class="postForm.order_by === 'count_view' ? 'active' : ''">
                            <a href="#" @click.prevent="() => {postForm.order_by = 'count_view'; getPosts()}">실시간</a>
                        </li>
                        <li :class="postForm.order_by === 'count_view_last_week' ? 'active' : ''">
                            <a href="#" @click.prevent="() => {postForm.order_by = 'count_view_last_week'; getPosts()}">주간</a>
                        </li>
                        <li :class="postForm.order_by === 'count_view_last_month' ? 'active' : ''">
                            <a href="#" @click.prevent="() => {postForm.order_by = 'count_view_last_month'; getPosts()}">월간</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="board-list-box bd0 mt24 mt-lg-15">
                <ul class="list half">
                    <post type="type-thumbnail02" :post="post" v-for="post in posts.data" :key="post.id"/>
                </ul>
            </div>

            <div class="board-title-box mt100 pt40 mt-lg-50 pt-lg-0">
                <strong>최근 게시글</strong>
                <div class="list-button-box bd0">
                    <ul>
                        <li :class="postForm.type === 'type-text' ? 'active' : ''">
                            <a href="#" class="filter list" @click.prevent="() => {postForm.type = 'type-text';}">리스트형</a>
                        </li>
                        <li :class="postForm.type === 'type-thumbnail02' ? 'active' : ''">
                            <a href="#" class="filter gallery" @click.prevent="() => {postForm.type = 'type-thumbnail02';}">갤러리형</a>
                        </li>
                        <li v-if="selectedBoard">
                            <nuxt-link :to="`/posts/create?board_id=${selectedBoard.id}&community_id=${community.id}`" class="write">글쓰기</nuxt-link>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="board-list-box">
                <ul class="list mt16">
                    <post :type="postForm.type" :post="post" v-for="post in latestPosts.data" :key="post.id"/>
                </ul>

                <loadMore :links="latestPosts.links" @loadMore="() => {getLatestPosts(true)}" />

            </div>

        </div>
    </article>

</template>
<script>
import Form from "~/utils/Form";
export default {
    data(){
        return {
            postForm: new Form(this.$axios, {
                page:1,
                take: 10,
                type: 'type-text',
                board_id: null,
                order_by: "count_view"
            }),

            form: new Form(this.$axios, {
                page:1,
            }),

            community: null,

            boards: {
                data: [],
                meta: {}
            },

            latestPosts: {
                data: [],
                meta: {}
            },

            posts: {
                data: [],
                meta: {}
            },

            activePop: false,
        }
    },

    methods:{
        getCommunity(){
            this.$axios.get("/api/communities/" + this.$route.query.id)
                .then(response => {
                    this.community = response.data.data;
                });
        },

        getBoards(){
            this.$axios.get("/api/boards", {
                params: {
                    community_id: this.$route.query.id,
                }
            }).then(response => {
                this.boards = response.data;

                if(this.boards.data.length > 0)
                    this.postForm.board_id = this.boards.data[0].id;

                this.getPosts();

                this.getLatestPosts();
            });
        },

        getPosts(){
            this.$axios.get("/api/posts", {
                params: this.postForm
            }).then(response => {
                this.posts = response.data;
            });
        },

        getLatestPosts(loadMore = false){
            if(loadMore)
                this.postForm.page += 1;

            this.$axios.get("/api/posts", {
                params: {
                    board_id: this.postForm.board_id,
                    order_by: "created_at",
                    take: 10,
                    page: this.postForm.page,
                }
            }).then(response => {
                if(loadMore)
                    return this.latestPosts = {
                        ...response.data,
                        data: [...this.latestPosts.data, ...response.data.data]
                    };

                return this.latestPosts = response.data;
            });
        }
    },

    computed: {
        selectedBoard(){
            return this.boards.data.find(board => board.id == this.postForm.board_id);
        }
    },

    mounted(){
        this.getCommunity();

        this.getBoards();
    }
}
</script>
