<template>
    <li class="list-item">
        <div>
            <div class="list-head">
                <div class="flex flex-vc">
                    <div class="flex-box" @click="() => $router.push(`/users/show?id=${subscription.targetUser.id}`)">
                        <div class="user-box sm">
                            <div class="user-top">
                                <div class="user-image" :style="`background-image:url('${subscription.targetUser.img ? subscription.targetUser.img.url : ''}');`"></div>
                                <div class="user-content">
                                    <strong>{{ subscription.targetUser.nickname }}</strong>
                                    <dl>
                                        <dd>구독자 {{subscription.targetUser.count_subscription.toLocaleString()}}명</dd>
                                        <dd>게시글 {{subscription.targetUser.count_post.toLocaleString()}}개</dd>
                                    </dl>
                                    <p>{{subscription.targetUser.description}}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex-box">
                        <div class="button-box">
                            <a href="#" class="btn btn-active btn-sm disabled" @click.prevent="subscript" v-if="subscription.targetUser.is_subscription">구독중</a>
                            <a href="#" class="btn btn-active btn-sm" @click.prevent="subscript" v-else>구독하기</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>
<style>

</style>
<script>
import Form from "~/utils/Form";
export default {
    props: ["subscription"],

    data(){
        return {
            form: new Form(this.$axios, {
                target_user_id: ""
            }),
        }
    },

    computed: {

    },

    methods: {
        subscript(){
            if(!this.$auth.user)
                return this.$store.commit("setPop", {
                    description: "로그인 후 이용 가능합니다."
                });

            this.subscription.targetUser.count_subscription = this.subscription.targetUser.is_subscription ? this.subscription.targetUser.count_subscription - 1 : this.subscription.targetUser.count_subscription + 1;

            this.subscription.targetUser.is_subscription = !this.subscription.targetUser.is_subscription;

            this.form.target_user_id = this.subscription.targetUser.id;

            this.form.post("/api/subscriptions");
        },
    },

    mounted() {

    }

}
</script>
