<template>
    <article>
        <div class="container lg">
            <profile :defaultUser="$auth.user.data" />

            <mypage-gnbs />

            <div class="board-list-box mt24 mt-lg-12">
                <ul class="list">
                    <div class="gray-box bdr0 mt40 mt-lg-20" v-if="!loading && communities.data.length === 0">
                        <div class="list-none-box">
                            <p>커뮤니티 모임장이 되어보세요</p>
                            <div class="flex flex-vc flex-tc">
                                <div class="button-box">
                                    <nuxt-link to="/communities/create" class="btn btn-active btn-sm">커뮤니티 신청하기</nuxt-link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="alert-box mt16">
                        <p><span>게시판 삭제를 원할 시 파니사니 문의하기를 이용해주세요.</span></p>
                    </div>

                    <div class="board-list-box mt40 mt-lg-20">
                        <ul class="list">
                            <community :community="community" v-for="community in communities.data" :key="community.id" />
                        </ul>
                    </div>
                </ul>
            </div>

            <loadMore :links="communities.links" @loadMore="() => {getCommunities(true)}" v-if="!loading" />
        </div>
    </article>
</template>

<script>
import Community from "@/components/mypage/Community";
import Form from "../../utils/Form";
export default {
    middleware: ['auth'],

    components: {Community},

    data(){
        return {
            loading: true,

            communities: {
                data: [],
                links : {},
                meta: {}
            },

            form : new Form(this.$axios, {
                page:1,
                user_id: this.$auth.user.data.id,
                order_by: "created_at"
            }),
        }
    },
    methods: {
        getCommunities(loadMore = false){
            if(loadMore)
                this.form.page += 1;

            this.$axios.get("/api/communities", {
                params: this.form
            }).then(response => {
                if(loadMore)
                    return this.communities = {
                        ...response.data,
                        data: [...this.communities.data, ...response.data.data]
                    };


                return this.communities = response.data;
            })
        },
    },

    computed: {

    },

    mounted() {
        this.getCommunities();

        let self = this;

        setTimeout(function(){
            self.loading = false;
        }, 100)
    }
}
</script>
