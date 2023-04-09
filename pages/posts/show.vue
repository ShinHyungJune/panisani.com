<template>
    <article>
        <div class="wrapper" v-if="post">
            <div class="board-view-box">
                <div class="view-head">
                    <div class="subject">
                        <span>{{post.board.title}}</span>
                        <strong>{{post.title}}</strong>
                    </div>
                    <div class="info">
                        <div class="info-user-box">
                            <img :src="post.user.img ? post.user.img.url : ''">
                            <div>
                                <b>{{ post.user.nickname }}</b>
                                <time>{{ post.format_created_at }}</time>
                            </div>
                        </div>
                        <a href="#" @click.prevent="copy">URL 복사</a>
                    </div>
                </div>
                <div class="view-body toastui-editor-contents" v-html="post.description"></div>
            </div>
            <div class="list-item-box mt32 mt-lg-25">
                <ul class="list">
                    <post :post="post" type="type-thumbnail01" v-for="post in posts.data" :key="post.id" />
                </ul>
            </div>

            <div class="comment-box mt100 pt40 mt-lg-50 pt-lg-20">
                <div class="comment-head">
                    <strong class="tit">베스트 댓글</strong>
                </div>
                <div class="comment-body">
                    <ul class="list">
                        <empty v-if="bestComments.data.length === 0"/>

                        <comment :comment="comment" v-for="comment in bestComments.data" :key="comment.id" @removed="bestCommentRemoved" />
                    </ul>

                    <div class="list-form">
                        <div class="form-reply-box">
                            <form @submit.prevent="storeComment">
                                <div class="form-head">
                                    <!--
                                    <div class="form-file">
                                        <label for="file01">
                                            <input type="file" name="file01" id="file01" accept="image/*" @change="(e) => commentForm.img = e.target.files[0]">
                                            <span>사진</span>
                                        </label>
                                        <label for="file02">
                                            <input type="file" name="file02" id="file02" @change="(e) => commentForm.file = e.target.files[0]">
                                            <span>파일</span>
                                        </label>
                                    </div>
                                    -->

                                    <div></div>
                                    <div class="button-box">
                                        <a href="" class="btn btn-active btn-sm" @click.prevent="storeComment">등록</a>
                                    </div>
                                </div>
                                <div class="form-body">
                                    <textarea placeholder="명예훼손, 개인정보 유출, 분쟁 유발, 허위사실 유포 등의 글은 이용약관에 의해 제제는 물론 법률에 의해 처벌 받을 수 있습니다. 건전한 커뮤니티를 위해 자제를 당부 드립니다" v-model="commentForm.description"></textarea>
                                    <!-- <sub>0/300</sub> -->
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="comment-box mt60 mt-lg-40">
                <div class="comment-head">
                    <strong class="tit">댓글 {{ comments.meta.total }}</strong>
                    <div class="filter-box">
                        <ul>
                            <li :class="commentForm.order_by === 'count_like' ? 'active' : ''"><a href="#" @click.prevent="() => {commentForm.page = 1; commentForm.order_by = 'count_like'; getComments()}">좋아요순</a></li>
                            <li :class="commentForm.order_by === 'created_at' ? 'active' : ''"><a href="#" @click.prevent="() => {commentForm.page = 1; commentForm.order_by = 'created_at'; getComments()}">최신순</a></li>
                            <!-- <li><a href="">찬반BEST순</a></li> -->
                            <li><a href="#" @click.prevent="activeSearch = true">댓글찾기</a></li>
                        </ul>
                    </div>
                </div>
                <div class="comment-search" v-if="activeSearch">
                    <form @submit.prevent="() => getComments(false)">
                        <input type="text" placeholder="닉네임을 검색해주세요" v-model="commentForm.word">
                        <a href="" class="delete" @click.prevent="activeSearch = false">삭제</a>
                        <a href="" class="submit" @click.prevent="() => getComments(false)">검색</a>
                    </form>
                </div>
                <div class="comment-body">
                    <empty v-if="comments.data.length === 0"/>

                    <ul class="list">
                        <comment :comment="comment" v-for="comment in comments.data" :key="comment.id" @removed="commentRemoved" />
                    </ul>
                </div>
            </div>

            <div class="container mt24">
                <div class="button-box">
                    <loadMore :links="comments.links" @loadMore="() => {getComments(true)}" />
                </div>
            </div>

            <div class="board-list-box mt100 pt20 mt-lg-50 pt-lg-0">
                <div class="title-box">
                    <div class="flex flex-tj">
                        <strong>인기글</strong>
                        <div class="filter-box">
                            <ul>
                                <li :class="postForm.order_by === 'count_view' ? 'active' : ''">
                                    <a href="#" @click.prevent="() => {postForm.page = 1; postForm.order_by = 'count_view'; getMorePosts()}">조회순</a>
                                </li>
                                <li :class="postForm.order_by === 'count_like' ? 'active' : ''">
                                    <a href="#" @click.prevent="() => {postForm.page = 1; postForm.order_by = 'count_like'; getMorePosts()}">좋아요순</a>
                                </li>
                                <li :class="postForm.order_by === 'count_comment' ? 'active' : ''">
                                    <a href="#" @click.prevent="() => {postForm.page = 1; postForm.order_by = 'count_comment'; getMorePosts()}">댓글순</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <ul class="list mt16">
                    <post type="type-text" v-for="post in morePosts.data" :key="post.id" :post="post" />
                </ul>
            </div>

            <loadMore :links="morePosts.links" @loadMore="() => {getMorePosts(true)}" />
        </div>
    </article>
</template>
<script>
import Form from "~/utils/Form";
export default {
    data(){
        return {
            activeSearch: false,

            post: null,

            posts: {
                data: []
            },

            morePosts: {
                data: []
            },

            comments: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                }
            },

            bestComments: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                }
            },

            postForm: new Form(this.$axios, {
                page:1,
                order_by : "count_view",
                board_id: null
            }),

            commentForm: new Form(this.$axios, {
                post_id: this.$route.query.id,
                order_by: "count_like",
                word: "",
                page:1,

                description: "",
                file: "",
                img: "",
            }),
        }
    },

    methods:{
        getPost(){
            this.$axios.get("/api/posts/" + this.$route.query.id)
                .then(response => {
                    this.post = response.data.data;

                    this.postForm.board_id = this.post.board.id;

                    this.getPosts();

                    this.getMorePosts();

                });
        },

        getPosts(){
            this.$axios.get("/api/posts", {
                params: this.postForm
            }).then(response => {
                this.posts = response.data;
            });
        },

        getMorePosts(loadMore = false){
            if(loadMore)
                this.postForm.page += 1;

            this.$axios.get("/api/posts", {
                params: this.postForm
            }).then(response => {
                if(loadMore)
                    return this.morePosts = {
                        ...response.data,
                        data: [...this.posts.data, ...response.data.data]
                    }

                return this.morePosts = response.data;
            });
        },

        getBestComments(){
            this.$axios.get("/api/commentsByBest", {
                params: {
                    post_id: this.$route.query.id
                }
            }).then(response => {
                this.bestComments = response.data;
            })
        },


        getComments(loadMore = false){
            if(loadMore)
                this.commentForm.page += 1;

            this.$axios.get("/api/comments", {
                params: this.commentForm
            }).then(response => {
                if(loadMore)
                    return this.comments = {
                        ...response.data,
                        data: [...this.comments.data, ...response.data.data]
                    }

                return this.comments = response.data;
            })
        },

        copy(){
            var url = '';
            var textarea = document.createElement("textarea");
            document.body.appendChild(textarea);
            url = window.document.location.href;
            textarea.value = url;
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);

            this.$store.commit("setPop", {
                description: "URL이 복사되었습니다."
            })
        },

        commentRemoved(comment){
            this.comments.data = this.comments.data.filter(commentData => commentData.id != comment.id);
        },

        bestCommentRemoved(comment){
            this.bestComments.data = this.bestComments.data.filter(commentData => commentData.id != comment.id);
        },

        storeComment(){
            this.commentForm.post("/api/comments")
                .then(response => {
                    console.log(response.data);

                    this.commentForm.description = "";

                    this.$store.commit("setPop", {
                        description: "댓글이 등록되었습니다!"
                    });

                    this.comments.data = [response.data, ...this.comments.data];
                })
        }
    },

    computed: {

    },

    mounted(){
        this.getPost();

        this.getBestComments();

        this.getComments();

    }
}
</script>
