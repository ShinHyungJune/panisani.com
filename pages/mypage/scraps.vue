<template>
    <article>
        <div class="container lg">
            <profile :defaultUser="$auth.user.data" />

            <mypage-gnbs />

            <div class="board-list-box mt24 mt-lg-12">
                <ul class="list">
                    <empty v-if="scraps.data.length === 0" />
                    <post type="type-text" :post="scrap.post" v-for="scrap in scraps.data" :key="scrap.id" />
                </ul>
            </div>

            <loadMore :links="scraps.links" @loadMore="() => {getScraps(true)}" />
        </div>
    </article>
</template>

<script>
import Form from "../../utils/Form";
export default {
    middleware: ['auth'],

    data(){
        return {
            scraps: {
                data: [],
                links : {},
                meta: {}
            },

            form : new Form(this.$axios, {
                page:1,
            }),
        }
    },
    methods: {
        getScraps(loadMore = false){
            if(loadMore)
                this.form.page += 1;

            this.$axios.get("/api/scraps", {
                params: this.form
            }).then(response => {
                if(loadMore)
                    return this.scraps = {
                        ...response.data,
                        data: [...this.scraps.data, ...response.data.data]
                    };


                return this.scraps = response.data;
            })
        },
    },

    computed: {

    },

    mounted() {
        this.getScraps();
    }
}
</script>
