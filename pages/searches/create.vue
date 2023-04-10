<template>
    <article>
        <div class="container">
            <div class="search-box">
                <form @submit.prevent="search">
                    <input type="text" placeholder="검색어를 입력해주세요." v-model="form.word" @input="getSearchCommunities">
                    <a href="#" class="delete" @click.prevent="form.word = ''; clearSearchCommunities();"></a>
                    <a href="#" class="submit" @click.prevent="search"></a>
                </form>
                <dl v-if="searchCommunities.data.length > 0" style="display:block;">
                    <dd v-for="searchCommunity in searchCommunities.data" :key="searchCommunity.id">
                        <nuxt-link :to="`/communities/show?id=${searchCommunity.id}`">
                            <p v-html="searchTitle(searchCommunity)"></p>
                            <span>MORE</span>
                        </nuxt-link>
                    </dd>
                </dl>
            </div>
            <div class="search-list-box mt80 mt-lg-50">
                <ul>
                    <li>
                        <strong>최근 방문 커뮤니티</strong>
                        <empty v-if="latestCommunities.length === 0"/>
                        <dl v-for="latestCommunity in latestCommunities" :key="latestCommunity.id">
                            <dd>
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
            timer: null,

        }
    },

    methods:{
        search() {

        },

        removeLatestCommunity(community){

        },

        getCommunities(e){
            this.$axios.get("/api/boards", {
                params: {
                    community_id: this.$route.query.community_id
                }
            }).then(response => {
                this.boards = response.data;
            })
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
        latestCommunities(){
            return this.$store.state.latestCommunities ? this.$store.state.latestCommunities.slice(0, 10) : [];
        },
    },

    mounted(){
        this.getCommunities();
    }
}
</script>
