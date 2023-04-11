<template>
    <article>
        <div class="container lg">
            <div class="cate-tab-box">
                <ul>
                    <li class="active">
                        <nuxt-link to="/notices">공지사항</nuxt-link>
                    </li>
                    <li><nuxt-link to="/qnas/create">고객의 소리</nuxt-link></li>
                    <li><nuxt-link to="/suggestions/create">제휴 문의</nuxt-link></li>
                </ul>
            </div>
            <div class="board-list-box">
                <empty v-if="notices.data.length === 0" />

                <ul class="list">
                    <li class="list-item toggle-box" v-for="notice in notices.data" :key="notice.id">
                        <a href="#" @click.prevent="toggle">
                            <div class="list-head">
                                <strong>{{ notice.title }}</strong>
                                <time>{{ notice.created_at }}</time>
                            </div>
                            <div class="list-body toggle-body" v-html="notice.description" style="white-space: pre-line"></div>
                        </a>
                    </li>
                </ul>
            </div>

            <loadMore :links="notices.links" @loadMore="() => {getNotices(true)}" />

        </div>
    </article>

</template>
<script>
import Form from "~/utils/Form";
export default {
    data(){
        return {
            form: new Form(this.$axios, {
                page:1,
            }),

            notices: {
                data: [],
                links: {}
            }
        }
    },

    methods:{
        getNotices(loadMore = false){
            if(loadMore)
                this.form.page += 1;

            this.$axios.get("/api/notices", {
                params: this.form
            })
                .then(response => {
                    if(loadMore)
                        return this.notices = {
                            ...response.data,
                            data: [...this.notices.data, ...response.data.data]
                        }

                    return this.notices = response.data;
                });
        },

        toggle(e){
            var parent = $(e.target).closest(".toggle-box");

            $(e.target).toggleClass("active");
            parent.find(".toggle-body").stop().slideToggle();
            parent.siblings(".toggle-box").find(".more").removeClass("active");
            parent.siblings(".toggle-box").find(".toggle-body").stop().slideUp();
        }
    },

    computed: {

    },

    mounted(){
        this.getNotices();
    }
}
</script>
