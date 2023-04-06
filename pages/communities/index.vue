<template>
    <article>
        <div class="container lg">
            <div class="flex flex-vc flex-tc mb64 mb-lg-32">
                <div class="button-box">
                    <nuxt-link to="/communities/create" class="btn btn-active btn-sm px16 plx-lg-10">커뮤니티 신청하기</nuxt-link>
                </div>
            </div>
            <div class="board-name-box">
                <ul>
                    <li v-for="(value, key) in categories" v-if="value.length > 0">
                        <strong>{{key}}</strong>
                        <dl>
                            <dd v-for="community in value" :key="community.id"><nuxt-link :to="`/communities/show?id=${community.id}`">{{ community.title }}</nuxt-link></dd>
                        </dl>
                    </li>
                </ul>
            </div>
        </div>
    </article>

</template>
<script>
import Form from "~/utils/Form";
export default {
    middleware: ["auth"],
    data(){
        return {
            form: new Form(this.$axios, {

            }),

            categories: [],
        }
    },

    methods:{
        getCategories(){
            this.$axios.get("/api/communitiesByChar")
                .then(response => {
                    this.categories = response.data;
                });
        },

    },

    computed: {

    },

    mounted(){
        this.getCategories();
    }
}
</script>
