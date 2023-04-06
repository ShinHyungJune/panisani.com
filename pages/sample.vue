<template>
    <div>
        <nuxt-link to="/login">로그인 테스트</nuxt-link>
        <nuxt-link to="/pointHistories">결제 테스트</nuxt-link>

        <input-editor @change="(data) => form.desription = data" default="테스트"/>

        <error :form="form" name="description" />

        <input-files @change="(data) => form.files = data" :default="form.files"/>

        <input-files @change="(data) => form.files = data" :default="form.files" :only-show="true"/>

        <pagination :meta="items.meta" @paginate="(page) => {form.page = page; filter()}" />

        <input-address @change="(data) => form[data.name] = data.value" :form="form" />
    </div>
</template>
<script>
import Form from "~/utils/Form";

export default {
    // middleware : ["auth"],

    // get방식은 form 쓰지말고 this.$axios 사용주의

    data(){
        return {
            form: new Form(this.$axios, {
                files: [],
                description: "",
            }),
            items: {
                data: [],
                meta: {
                    last_page: 1,
                    current_page: 1
                }
            }
        }
    },

    methods: {
        filter(){
            this.$axios.get("/api/test")
                .then(response => {
                    // this.items = response.data;
                });
        }
    }
}
</script>
