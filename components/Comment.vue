<template>
    <li class="list-item">
        <div class="list-head">
            <div class="info-user-box">
                <img :src="comment.user.img ? comment.user.img.url : ''">
                <div>
                    <b>{{ comment.user.nickname }}</b>
                    <time>{{ comment.format_created_at }}</time>
                    <span class="sticker pu" v-if="comment.best">BEST</span>
                </div>
            </div>
            <div class="state-box">
                <dl>
                    <dd :class="`like ${comment.isLike ? 'on' : ''}`">
                        <a href="#" @click.prevent="like">{{ comment.count_like.toLocaleString() }}</a>
                    </dd>
                    <dd :class="`face ${comment.isHate ? 'on' : ''}`">
                        <a href="#" @click.prevent="hate">{{ comment.count_hate.toLocaleString() }}</a>
                    </dd>
                    <dd class="more">
                        <a href="#" @click.prevent="active = true">열기</a>
                        <div v-if="active">
                            <a href="#" class="close" @click.prevent="active = false">닫기</a>
                            <!--
                            <a href="#">수정</a>
                            -->
                            <a href="#" @click.prevent="remove" v-if="$auth.user && $auth.user.id == comment.user.id">삭제</a>
                            <a href="#" @click.prevent="report">신고</a>
                        </div>
                    </dd>
                </dl>
            </div>
        </div>

        <div class="list-body">
            <p>{{description}}</p>
            <div class="more" v-if="comment.description.length > this.max">
                <a href="#" :class="showAll ? 'active' : ''" @click.prevent="showAll = !showAll">원문보기</a>
            </div>
        </div>

        <div class="list-reply" v-if="comment.comments.length > 0">
            <comment :comment="reply" v-for="reply in comment.comments" :key="reply.id" @removed="replyRemoved" />
        </div>
    </li>

</template>
<style>

</style>
<script>
import Form from "~/utils/Form";
export default {
    props: ["comment"],

    data(){
        return {
            form: new Form(this.$axios, {
                comment_id: this.comment.id
            }),

            showAll: false,
            active: false,
            max: 100,
        }
    },

    computed: {
        description(){
            if(!this.showAll)
                return this.comment.description.slice(0, this.max);

            return this.comment.description;
        },
    },

    methods: {
        like(){
            if(!this.$auth.user)
                return this.$store.commit("setPop", {
                    description: "로그인 후 이용 가능합니다."
                });

            this.comment.count_like = this.comment.isLike ? this.comment.count_like - 1 : this.comment.count_like + 1;

            this.comment.isLike = !this.comment.isLike;

            this.form.post("/api/likes");
        },

        hate(){
            if(!this.$auth.user)
                return this.$store.commit("setPop", {
                    description: "로그인 후 이용 가능합니다."
                });

            this.comment.count_hate = this.comment.isHate ? this.comment.count_hate - 1 : this.comment.count_hate + 1;

            this.comment.isHate = !this.comment.isHate;

            this.form.post("/api/hates");
        },

        remove(){
            this.form.delete("/api/comments/" + this.comment.id)
                .then(response => {
                    this.$emit("removed", this.comment);
                })
        },

        replyRemoved(comment){
            this.comment.comments = this.comment.comments.data.filter(commentData => commentData.id != comment.id);
        }
    },

    mounted() {

    }

}
</script>
