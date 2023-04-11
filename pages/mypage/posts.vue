<template>
    <article>
        <div class="container lg">
            <profile :defaultUser="$auth.user.data" />

            <mypage-gnbs />

            <div class="board-list-box mt24 mt-lg-12">
                <ul class="list">
                    <empty v-if="posts.data.length === 0" />
                    <post type="type-text" :post="post" v-for="post in posts.data" :key="post.id" />
                </ul>
            </div>

            <loadMore :links="posts.links" @loadMore="() => {getPosts(true)}" />
        </div>
    </article>
</template>

<script>
import Form from "../../utils/Form";
export default {
    middleware: ['auth'],

    data(){
        return {
            posts: {
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
