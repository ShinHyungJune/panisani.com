<template>
    <div class="user-box" v-if="user">
        <div class="user-top">
            <div class="user-image" :style="`background-image:url(${user.img ? user.img.url : ''})`"></div>
            <div class="user-content">
                <div class="flex flex-vc flex-tr">
                    <a href="#" @click.prevent="activeReport = true" v-if="$auth.user && $auth.user.data.id != user.id">신고</a>
                    <a href="#" @click.prevent="activeEdit = true" class="update" v-if="$auth.user && $auth.user.data.id == user.id">설정</a>
                </div>
                <strong>{{ user.nickname }}</strong>
                <p>{{ user.description }}</p>
            </div>
        </div>
        <div class="user-bottom">
            <ul>
                <li>
                    <span>게시글</span>
                    <b>{{ user.count_post }}</b>
                </li>
                <li>
                    <span>구독자</span>
                    <b>{{ user.count_subscription }}</b>
                    <div class="button-box">
                        <a href="#" class="btn btn-active btn-sm disabled" @click.prevent="subscription" v-if="user.is_subscription">구독중</a>
                        <a href="#" class="btn btn-active btn-sm" @click.prevent="subscription" v-else>구독하기</a>
                    </div>
                </li>
            </ul>
        </div>

        <!-- 신고하기 팝업 -->
        <pop-report v-if="activeReport" @close="activeReport = false" :user="user" />


        <!-- 내 정보 수정 팝업 -->
        <pop-user-edit v-if="activeEdit" @close="activeEdit = false" :user="user" @change="(data) => this.user = data" />
    </div>
</template>
<style>

</style>
<script>
import Form from "~/utils/Form";
export default {
    props: ["defaultUser"],

    data(){
        return {
            activeReport: false,
            activeEdit: false,
            user: this.defaultUser,
            form: new Form(this.$axios, {
                target_user_id: ""
            }),
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
        subscription(){
            if(!this.$auth.user)
                return this.$store.commit("setPop", {
                    description: "로그인 후 이용 가능합니다."
                });

            this.user.count_subscription = this.user.is_subscription ? this.user.count_subscription - 1 : this.user.count_subscription + 1;

            this.user.is_subscription = !this.user.is_subscription;

            this.form.target_user_id = this.user.id;

            this.form.post("/api/subscriptions");
        },
    },

    mounted() {
        if(!this.defaultUser)
            this.$axios.get("/api/users/" + this.$route.query.id)
                .then(response => {
                    this.user = response.data.data;
                })
    }

}
</script>
