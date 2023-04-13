<template>
    <article>
        <div class="container">
            <div class="search-box">
                <form @submit.prevent="search">
                    <input type="text" placeholder="검색어를 입력해주세요." v-model="form.word" @input="getSearchCommunities">
                    <a href="#" class="delete" @click.prevent="form.word = ''; clearSearchCommunities();"></a>
                    <a href="#" class="submit" @click.prevent="search"></a>
                </form>
                <dl v-if="searchCommunities.data.length > 0 && !afterSearch" style="display:block;">
                    <dd v-for="searchCommunity in searchCommunities.data" :key="searchCommunity.id">
                        <nuxt-link :to="`/communities/show?id=${searchCommunity.id}`">
                            <p v-html="searchTitle(searchCommunity)"></p>
                            <span>MORE</span>
                        </nuxt-link>
                    </dd>
                </dl>
            </div>

            <div class="after-search" v-if="afterSearch">
                <div class="cate-tab-box mt32 mt-lg-20">
                    <ul>
                        <li :class="filter === '' ? 'active' : ''">
                            <a href="#" @click.prevent="() => {filter = '';}">통합검색</a>
                        </li>
                        <li :class="filter === 'communities' ? 'active' : ''">
                            <a href="#" @click.prevent="() => {filter = 'communities';}">커뮤니티</a>
                        </li>
                        <li :class="filter === 'posts' ? 'active' : ''">
                            <a href="#" @click.prevent="() => {filter = 'posts';}">게시글</a>
                        </li>
                        <li :class="filter === 'comments' ? 'active' : ''">
                            <a href="#" @click.prevent="() => {filter = 'comments';}">댓글</a>
                        </li>
                    </ul>
                </div>

                <div class="section-communities" v-if="filter === '' || filter === 'communities'">

                    <div class="board-title-box mt70 mt-lg-40">
                        <strong>커뮤니티</strong>
                        <nuxt-link to="/communities">전체보기</nuxt-link>
                    </div>
                    <empty v-if="communities.data.length === 0" />
                    <div class="search-list-box">
                        <ul>
                            <li>
                                <dl>
                                    <dd v-for="community in communities.data" :key="community.id">
                                        <nuxt-link :to="`/communities/show?id=${community.id}`" class="subject">{{ community.title }}</nuxt-link>
                                    </dd>
                                </dl>
                            </li>
                        </ul>

                        <loadMore :links="communities.links" @loadMore="() => {getCommunities(true)}" />

                    </div>
                </div>
                <div class="section-posts" v-if="filter === '' || filter === 'posts'">
                    <div class="board-title-box bd mt100 pt100 mt-lg-50 pt-lg-0">
                        <strong>게시글</strong>
                        <!--                    <a href="#">전체보기</a>-->
                    </div>
                    <div class="board-list-box bd0">
                        <empty v-if="posts.data.length === 0" />
                        <ul class="list">
                            <li class="list-item" v-for="post in posts.data" :key="post.id">
                                <nuxt-link :to="`/posts/show?id=${post.id}`">
                                    <div class="list-head">
                                        <div class="list-head-flex">
                                            <div class="flex-image">
                                                <img :src="post.thumbnail">
                                            </div>
                                            <div class="flex-content flex-1">
                                                <strong>{{post.title}}</strong>
                                                <div class="list-info-box">
                                                    <dl>
                                                        <dd><b>{{ post.user.nickname }}</b></dd>
                                                        <dd>{{ post.format_created_at }}</dd>
                                                        <dd class="comment">{{ post.count_comment.toLocaleString() }}</dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </nuxt-link>
                            </li>
                        </ul>
                    </div>
                    <loadMore :links="posts.links" @loadMore="() => {getPosts(true)}" />

                </div>
                <div class="section-comments" v-if="filter === '' || filter === 'comments'">
                    <div class="board-title-box bd mt100 mt-lg-50">
                        <strong>댓글</strong>
                        <!--                    <a href="">전체보기</a>-->
                    </div>
                    <empty v-if="comments.data.length === 0" />
                    <div class="board-list-box">
                        <ul class="list">
                            <li class="list-item" v-for="comment in comments.data" :key="comment.id">
                                <nuxt-link :to="`/posts/show?id=${comment.post.id}`">
                                    <div class="list-head">
                                        <strong>{{ comment.description }}</strong>
                                        <div class="list-info-box">
                                            <dl>
                                                <dd><b>{{ comment.user.nickname }}</b></dd>
                                                <dd>{{ comment.format_created_at }}</dd>
                                                <!--                                            <dd class="comment">123</dd>-->
                                            </dl>
                                        </div>
                                    </div>
                                </nuxt-link>
                            </li>
                        </ul>
                    </div>
                    <loadMore :links="comments.links" @loadMore="() => {getComments(true)}" />

                </div>
            </div>

            <div class="before-search" v-else>
                <div class="search-list-box mt80 mt-lg-50">
                    <ul>
                        <li>
                            <strong>최근 방문 커뮤니티</strong>
                            <empty v-if="$store.state.latestCommunities.length === 0"/>
                            <dl>
                                <dd v-for="latestCommunity in $store.state.latestCommunities" :key="latestCommunity.id">
                                    <nuxt-link :to="`/communities/show?id=${latestCommunity.id}`" class="subject">{{ latestCommunity.title }}</nuxt-link>
                                    <a href="#" class="delete" @click.prevent="() => removeLatestCommunity(latestCommunity)">삭제</a>
                                </dd>
                            </dl>
                        </li>
                        <li>
                            <strong>인기 커뮤니티</strong>
                            <empty v-if="communities.data.length === 0"/>
                            <dl>
                                <dd v-for="community in communities.data" :key="community.id">
                                    <nuxt-link :to="`/communities/show?id=${community.id}`" class="subject">{{ community.title }}</nuxt-link>
                                </dd>
                            </dl>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </article>
</template>
<style>

</style>
<script>
import _ from 'lodash';
import Form from "~/utils/Form";
export default {
    data(){
        return {
            filter: "",

            postForm: new Form(this.$axios, {
                word: this.$route.query.word ? this.$route.query.word : '',
                order_by: "count_view",
                page: 1,
            }),

            communityForm: new Form(this.$axios, {
                word: "",
                order_by: "count_view",
                page: 1,
            }),

            commentForm: new Form(this.$axios, {
                word: "",
                page: 1,
            }),

            form: new Form(this.$axios, {
                word: "",
            }),

            searchCommunities: {
                data: [],
                meta: {},
                links: {}
            },
            communities: {
                data: [],
                meta: {},
                links: {}
            },
            posts: {
                data: [],
                meta: {},
                links: {}
            },
            comments: {
                data: [],
                meta: {},
                links: {}
            },
            timer: null,
            afterSearch: this.$route.query.word ? true : false,
        }
    },

    methods:{
        search() {
            this.afterSearch = true;

            this.getComments();

            this.getPosts();

            this.getCommunities();
        },

        removeLatestCommunity(community){
            this.$store.commit("removeLatestCommunity", community);
        },

        getCommunities(loadMore = false){

            this.communityForm.word = this.form.word;

            if(loadMore)
                this.communityForm.page += 1;

            this.$axios.get("/api/communities", {
                params: {
                    word: this.form.word,
                    order_by: "count_view",
                }
            }).then(response => {
                if(loadMore)
                    return this.communities = {
                        ...response.data,
                        data: [...this.communities.data, ...response.data.data]
                    }

                return this.communities = response.data;
            })
        },

        getPosts(loadMore = false){
            this.postForm.word = this.form.word;

            if(loadMore)
                this.postForm.page += 1;


            this.$axios.get("/api/posts", {
                params: this.postForm
            })
                .then(response => {
                    if(loadMore)
                        return this.posts = {
                            ...response.data,
                            data: [...this.posts.data, ...response.data.data]
                        }

                    return this.posts = response.data;
            })
        },

        getComments(loadMore = false){
            this.commentForm.word = this.form.word;

            if(loadMore)
                this.commentForm.page += 1;

            this.$axios.get("/api/comments", {
                params: this.commentForm
            })
                .then(response => {
                    if(loadMore)
                        return this.comments = {
                            ...response.data,
                            data: [...this.comments.data, ...response.data.data]
                        }

                    return this.comments = response.data;
                });
        },

        getSearchCommunities(e){
            clearTimeout(this.timer);

            this.form.word = e.target.value;

            if(this.form.word === "")
                return this.clearSearchCommunities();

            this.timer = setTimeout(() => {
                this.$axios.get("/api/communities", {
                    params: this.form
                }).then(response => {
                    if(this.form.word === "")
                        return this.searchCommunities.data = [];

                    this.searchCommunities = response.data;
                });
            }, 100);
        },

        searchTitle(searchCommunity){
            return searchCommunity.title.replace(this.form.word, `<b>${this.form.word}</b>`);
        },

        clearSearchCommunities(){
            this.searchCommunities.data = [];
        }
    },

    computed: {

    },

    mounted(){
        this.getCommunities();

        if(this.$route.query.word){
            this.getSearchCommunities();
            this.getComments();
            this.getPosts();
        }
    }
}
</script>
