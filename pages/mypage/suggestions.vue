<template>
    <article>
        <div class="container lg">
            <profile :defaultUser="$auth.user.data" />

            <mypage-gnbs />

            <div class="alert-box mt16">
                <p><span>제휴문의 내용에 대한 답변은 고객님의 메일 주소로 발송해드립니다.</span></p>
            </div>
            <div class="board-list-box">
                <ul class="list">
                    <li class="list-item toggle-box" v-for="suggestion in suggestions.data" :key="suggestion.id">
                        <a href="#" class="more" @click.prevent="toggle">
                            <div class="list-head">
                                <div class="list-head-flex">
                                    <div class="flex-type">
                                        <b>제휴문의</b>
                                    </div>
                                    <div class="flex-content">
                                        <strong>{{ suggestion.description}}</strong>
                                        <time>{{ suggestion.created_at }}</time>
                                    </div>
                                </div>
                            </div>
                            <div class="list-body toggle-body" v-html="suggestion.answer" v-if="suggestion.answer"></div>
                            <div class="list-body toggle-body" v-else>답변대기</div>
                        </a>
                    </li>

                </ul>
            </div>

            <loadMore :links="suggestions.links" @loadMore="() => {getSuggestions(true)}" />
        </div>
    </article>
</template>

<script>
import Form from "../../utils/Form";
export default {
    middleware: ['auth'],

    data(){
        return {
            suggestions: {
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
        getSuggestions(loadMore = false){
            if(loadMore)
                this.form.page += 1;

            this.$axios.get("/api/suggestions", {
                params: this.form
            }).then(response => {
                if(loadMore)
                    return this.suggestions = {
                        ...response.data,
                        data: [...this.suggestions.data, ...response.data.data]
                    };


                return this.suggestions = response.data;
            })
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

    mounted() {
        this.getSuggestions();
    }
}
</script>
