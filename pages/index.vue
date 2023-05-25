<template>
    <article>
        <div class="wrapper">
            <div class="title-box">
                <h2 class="mt0">YOUTUBE</h2>
            </div>
            <div class="main-list-box mt40 mt-lg-20">
                <div class="main-image" v-if="youtubes.data.length > 0">
                    <a :href="youtubes.data[0].url" target="_blank">
                        <div :style="`background-image:url('${youtubes.data[0].thumbnail}'); background-repeat:no-repeat; background-size:cover`"></div>
                        <p>{{ youtubes.data[0].title }}</p>
                    </a>
                </div>
                <div class="main-list">
                    <div v-for="youtube in youtubes.data" :key="youtube.id">
                        <a :href="youtube.url" target="_blank">
                            <div :style="`background-image:url('${youtube.thumbnail}'); background-repeat:no-repeat; background-size:cover`"></div>
                            <p>{{ youtube.title }}</p>
                        </a>
                    </div>
                </div>
            </div>

            <div class="title-box mt50 pt50 mt-lg-50 pt-lg-0">
                <h2>SPECIAL</h2>
            </div>
            <div class="list-item-box mt32 mt-lg-25">
                <ul class="list">
                    <post type="type-thumbnail01" :post="special.post" v-for="special in specials.data" :key="special.id"/>
                </ul>
            </div>

            <div class="title-box mt50 pt50 mt-lg-50 pt-lg-0">
                <h2>COMMUNITY</h2>
            </div>
            <div class="cate-list-box mt24 mt-lg-15">
                <ul>
                    <li class="active"><a href="" @click.prevnet="">BEST</a></li>
                    <li :class="community.id === form.community_id ? 'activeToggle' : ''" v-for="community in communities.data" :key="community.id">
                        <a href="" @click.prevent="() => {form.community_id = community.id; getPosts()}">{{
                            community.title
                        }}</a>
                    </li>
                </ul>
            </div>
            <div class="board-title-box mt25">
                <div class="flex-1 tr">
                    <div class="cate-tab-box bd0">
                        <ul>
                            <li :class="`${form.order_by === 'count_view' ? 'active' : ''}`"><a href="" @click.prevent="() => {form.order_by = 'count_view'; getPosts();}">조회순</a></li>
                            <li :class="`${form.order_by === 'created_at' ? 'active' : ''}`"><a href="" @click.prevent="() => {form.order_by = 'created_at'; getPosts();}">등록순</a></li>
                            <li :class="`${form.order_by === 'count_like' ? 'active' : ''}`"><a href="" @click.prevent="() => {form.order_by = 'count_like'; getPosts();}">좋아요순</a></li>
                            <li :class="`${form.order_by === 'count_comment' ? 'active' : ''}`"><a href="" @click.prevent="() => {form.order_by = 'count_comment'; getPosts();}">댓글순</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="board-list-box bd0 mt24 mt-lg-15">
                <ul class="list half">
                    <post type="type-thumbnail02" :post="post" v-for="post in posts.data" :key="post.id"/>
                </ul>
            </div>

            <div class="title-box mt50 pt50 mt-lg-50 pt-lg-0">
                <h2>NFT GAME</h2>
            </div>
            <div class="board-image-box mt24">
                <ul>
                    <li v-for="game in games.data" :key="game.id">
                        <a :href="game.url" :style="`background-image:url(${game.img.url})`"></a>
                    </li>
                </ul>
            </div>

            <!--
            <div class="title-box mt50 pt50 mt-lg-50 pt-lg-0">
                <h2>NFT GAME</h2>
            </div>
            <div class="board-family-box mt24">
                <ul>
                    <li><img src="/images/family01.png"></li>
                    <li><img src="/images/family02.png"></li>
                    <li><img src="/images/family03.png"></li>
                    <li><img src="/images/family04.jpg"></li>
                    <li><img src="/images/family05.png"></li>
                    <li><img src="/images/family01.png"></li>
                    <li><img src="/images/family02.png"></li>
                    <li><img src="/images/family03.png"></li>
                    <li><img src="/images/family04.jpg"></li>
                    <li><img src="/images/family05.png"></li>
                    <li><img src="/images/family01.png"></li>
                    <li><img src="/images/family02.png"></li>
                    <li><img src="/images/family03.png"></li>
                    <li><img src="/images/family04.jpg"></li>
                    <li><img src="/images/family05.png"></li>
                    <li><img src="/images/family01.png"></li>
                    <li><img src="/images/family02.png"></li>
                    <li><img src="/images/family03.png"></li>
                    <li><img src="/images/family04.jpg"></li>
                    <li><img src="/images/family05.png"></li>
                </ul>
            </div>
            -->
        </div>
    </article>
</template>

<script>
import Form from "@/utils/Form";

export default {
    // middleware : ["auth"],

    name: 'IndexPage',

    // get방식은 form 쓰지말고 this.$axios 사용주의

    data(){
        return {
            form: new Form(this.$axios, {
                community_id: null,
                order_by: "count_view",
                take: 8,
            }),
            youtubes: {
                data: [],
                meta: {
                    last_page: 1,
                    current_page: 1
                }
            },
            specials: {
                data: [],
                meta: {
                    last_page: 1,
                    current_page: 1
                }
            },
            communities: {
                data: [],
                meta: {
                    last_page: 1,
                    current_page: 1
                }
            },
            posts: {
                data: [],
                meta: {
                    last_page: 1,
                    current_page: 1
                }
            },
            games: {
                data: [],
                meta: {
                    last_page: 1,
                    current_page: 1
                }
            },
        }
    },

    methods: {
        getYoutubes(){
            this.$axios.get("/api/youtubes")
                .then(response => {
                    this.youtubes = response.data;
                });
        },
        getSpecials(){
            this.$axios.get("/api/specials")
                .then(response => {
                    console.log(response.data);
                    this.specials = response.data;
                });
        },
        getCommunities(){
            this.$axios.get("/api/communities", {
                params: {
                    take: 6
                }
            }).then(response => {
                this.communities = response.data;

                if(this.communities.data.length > 0){
                    this.form.community_id = this.communities.data[0].id;

                    this.getPosts();
                }
            });
        },
        getPosts(){
            this.$axios.get("/api/posts", {
                params: this.form
            }).then(response => {
                this.posts = response.data;
            });
        },
        getGames(){
            this.$axios.get("/api/games", {

            }).then(response => {
                this.games = response.data;
            });
        },
    },

    mounted() {
        this.getYoutubes();

        this.getSpecials();

        this.getCommunities();

        this.getGames();
    }

}
</script>
