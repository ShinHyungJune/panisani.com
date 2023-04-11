<template>
    <article>
        <div class="container lg">
            <client-only>
                <profile />

                <div class="filter-box mt48 mt-lg-24">
                    <ul>
                        <li :class="form.order_by === 'count_like' ? `active` : ''">
                            <a href="#" @click.prevent="()=>{form.order_by = 'count_like'; form.page = 1; getPosts()}">좋아요순</a>
                        </li>
                        <li :class="form.order_by === 'created_at' ? `active` : ''">
                            <a href="#" @click.prevent="()=>{form.order_by = 'created_at'; form.page = 1; getPosts()}">최신순</a>
                        </li>
                    </ul>
                </div>
                <div class="board-list-box mt24 mt-lg-12">
                    <empty v-if="posts.data.length === 0" />

                    <ul class="list">
                        <post type="type-text" :post="post" v-for="post in posts.data" :key="post.id" />
                    </ul>
                </div>

                <loadMore :links="posts.links" @loadMore="() => {getPosts(true)}" />
            </client-only>
        </div>
    </article>
</template>

<script>
import Form from "../../utils/Form";
export default {
    data(){
        return {
            posts: {
                data: [],
                links : {},
                meta: {}
            },

            form : new Form(this.$axios, {
                user_id: this.$route.query.id,
                order_by: "count_like",
                page:1,
            }),
        }
    },
    methods: {
        getPosts(loadMore = false){
            if(loadMore)
                this.form.page += 1;

            this.$axios.get("/api/posts", {
                params: this.form
            }).then(response => {
                if(loadMore)
                    return this.posts = {
                        ...response.data,
                        data: [...this.posts.data, ...response.data.data]
                    };

                return this.posts = response.data;
            })
        },
    },

    computed: {

    },

    mounted() {
        this.getPosts();
    }
}
</script>
