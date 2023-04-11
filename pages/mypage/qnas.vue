<template>
    <article>
        <div class="container lg">
            <profile :defaultUser="$auth.user.data" />

            <mypage-gnbs />

            <div class="alert-box mt16">
                <p><span>문의 내용에 대한 답변은 고객님의 메일 주소로 발송해드립니다.</span></p>
            </div>
            <div class="board-list-box">
                <ul class="list">
                    <li class="list-item toggle-box" v-for="qna in qnas.data" :key="qna.id">
                        <a href="#" class="more" @click.prevent="toggle">
                            <div class="list-head">
                                <div class="list-head-flex">
                                    <div class="flex-type">
                                        <b>고객의 소리</b>
                                    </div>
                                    <div class="flex-content">
                                        <strong>{{ qna.description}}</strong>
                                        <time>{{ qna.created_at }}</time>
                                    </div>
                                </div>
                            </div>
                            <div class="list-body toggle-body" v-html="qna.answer" v-if="qna.answer"></div>
                            <div class="list-body toggle-body" v-else>답변대기</div>
                        </a>
                    </li>

                </ul>
            </div>

            <loadMore :links="qnas.links" @loadMore="() => {getQnas(true)}" />
        </div>
    </article>
</template>

<script>
import Form from "../../utils/Form";
export default {
    middleware: ['auth'],

    data(){
        return {
            qnas: {
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
        getQnas(loadMore = false){
            if(loadMore)
                this.form.page += 1;

            this.$axios.get("/api/qnas", {
                params: this.form
            }).then(response => {
                if(loadMore)
                    return this.qnas = {
                        ...response.data,
                        data: [...this.qnas.data, ...response.data.data]
                    };


                return this.qnas = response.data;
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
        this.getQnas();
    }
}
</script>
