<template>
    <article>
        <div class="container lg">
            <profile :defaultUser="$auth.user.data" />

            <mypage-gnbs />

            <div class="cate-switch-box mt40 mt-lg-30">
                <ul>
                    <li :class="form.target_user_id ? `active` : ''">
                        <a href="#" @click.prevent="()=>{form.target_user_id = $auth.user.data.id; form.user_id = ''; form.page = 1; getSubscriptions()}">나를 구독</a>
                    </li>
                    <li :class="form.user_id ? `active` : ''">
                        <a href="#" @click.prevent="()=>{form.user_id = $auth.user.data.id; form.target_user_id = ''; form.page = 1; getSubscriptions()}">내가 구독</a>
                    </li>
                </ul>
            </div>
            <div class="board-list-box mt-lg-15">
                <ul class="list">
                    <empty v-if="subscriptions.data.length === 0" />

                    <subscription :subscription="subscription" v-for="subscription in subscriptions.data" :key="subscription.id"/>
                </ul>
            </div>

            <loadMore :links="subscriptions.links" @loadMore="() => {getSubscriptions(true)}" />
        </div>
    </article>
</template>

<script>
import Form from "../../utils/Form";
export default {
    middleware: ['auth'],

    data(){
        return {
            subscriptions: {
                data: [],
                links : {},
                meta: {}
            },

            form : new Form(this.$axios, {
                target_user_id: this.$auth.user.data.id,
                user_id: "",
                page:1,
            }),
        }
    },
    methods: {
        getSubscriptions(loadMore = false){
            if(loadMore)
                this.form.page += 1;

            this.$axios.get("/api/subscriptions", {
                params: this.form
            }).then(response => {
                if(loadMore)
                    return this.subscriptions = {
                        ...response.data,
                        data: [...this.subscriptions.data, ...response.data.data]
                    };


                return this.subscriptions = response.data;
            })
        },
    },

    computed: {

    },

    mounted() {
        this.getSubscriptions();
    }
}
</script>
